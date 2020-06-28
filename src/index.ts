import EventEmitter from 'eventemitter3'
var channel = 0
const Servers: {
  [key: string]: {
    ServerE: EventEmitter
    ClientE: EventEmitter
  }
} = new Proxy(
  {},
  {
    get: function(obj: any, prop) {
      if (!obj[prop]) {
        obj[prop] = {
          ServerE: new EventEmitter(),
          ClientE: new EventEmitter(),
        }
      }
      return obj[prop]
    },
    deleteProperty: function(obj, prop) {
      obj[prop] = undefined
      return true
    },
  }
)

export class Client {
  id?: string
  emitter: any
  ServerE?: EventEmitter
  ClientE?: EventEmitter
  constructor(id?: string) {
    this.id = id
    if (id) {
      let emt = Servers[id]
      this.ServerE = emt.ServerE
      this.ClientE = emt.ClientE
    }
  }
  use<T = any>(emitter: () => Promise<T> | any) {
    this.emitter = emitter
    return this
  }
  async get<T = any, D = any>({
    server,
    path,
    data,
  }: {
    server?: string
    path: string
    data: D
  }) {
    return await this.run<T, D>(path, data, 'get', server)
  }
  /**
   * @TODO
   * return a success or error flag
   */
  async post<T = any, D = any>({
    server,
    path,
    body,
  }: {
    server?: string
    path: string
    body: D
  }) {
    return await this.run<T, D>(path, body, 'post', server)
  }
  private async run<T, D>(
    path: string,
    data: D,
    type: 'get' | 'post',
    server?: string
  ): Promise<T> {
    let { emitter, ServerE, ClientE } = this
    if (emitter) {
      this.emitter = void 0
      return emitter(data)
    }

    return await new Promise((res) => {
      if (server) {
        let emt = Servers[server]
        ServerE = emt.ServerE
        ClientE = emt.ClientE
      } else if (this.id) {
        server = this.id
      } else {
        // 没有server指向
        return res()
      }
      if (!ServerE || !ClientE) return res()
      let serverEvName = `${type}+${server}+${path}`
      let hasServer =
        ServerE.eventNames().findIndex((v) => v === serverEvName) > -1
      if (!hasServer) return res(void 0)
      // 并发get
      let thisChannel = channel++
      ClientE.once(
        `${type}+client+${server}+${path}:${thisChannel}`,
        (resData) => {
          res(resData)
        }
      )
      ServerE.emit(serverEvName, { data, channel: thisChannel })
    })
  }
}
type Event<T, R> = {
  path: string
  eid: number
  off: boolean
  serverName: string
  type: 'get' | 'post'
  callback: (data: T) => Promise<R>
}
export class Server {
  id: string
  events: Event<any, any>[]
  private ServerE: EventEmitter
  private ClientE: EventEmitter
  constructor(id: string) {
    this.id = id
    this.events = []
    let emt = Servers[id]
    this.ServerE = emt.ServerE
    this.ClientE = emt.ClientE
  }
  private prefixing(type: 'post' | 'get', path: string) {
    return `${type}+${this.id}+${path}`
  }
  private run<T, R>(
    type: 'get' | 'post',
    path: string,
    callback: (data: T) => Promise<R>
  ) {
    let { ServerE, ClientE } = this
    let serverName = this.prefixing(type, path)
    let eid = this.events.length
    let clientName = `${type}+client+${this.id}+${path}`
    let noServer =
      ServerE.eventNames().findIndex((v) => v === serverName) === -1

    if (!noServer && type === 'get') {
      throw new Error(
        `[Jinter Error]: Get Serer(${path}) only can be listening once, you should remove one`
      )
    }

    this.events.push({
      path,
      eid,
      type,
      serverName,
      off: false,
      callback,
    })
    ServerE &&
      ClientE &&
      noServer &&
      ServerE.on(serverName, async ({ data, channel }) => {
        let events = this.events.filter(
          (e) => e.serverName === serverName && e.off === false
        )
        if (events.length > 0) {
          events.forEach(async (e) => {
            if (e.callback) {
              let res = await e.callback(data)
              ClientE.emit(clientName + ':' + channel, res)
            } else {
              ClientE.emit(clientName + ':' + channel, void 0)
            }
          })
        } else {
          ClientE.emit(clientName + ':' + channel, void 0)
        }
      })
    return eid
  }
  onGet<T = any, R = any>(
    { path }: { path: string },
    callback: (data: T) => Promise<R>
  ) {
    return this.run<T, R>('get', path, callback)
  }
  /**
   * @TODO
   * return a success or error flag
   */
  onPost<T = any, R = any>(
    { path }: { path: string },
    callback: (data: T) => Promise<R>
  ) {
    return this.run<T, R>('post', path, callback)
  }
  remove(type: 'get' | 'post', path: string) {
    let name = this.prefixing(type, path)
    this.ServerE && this.ServerE.removeListener(name)
  }
  /**
   * 关闭某一个监听
   * @param eid 事件id
   */
  off(eid: number, remove?: boolean) {
    this.events = this.events.filter((e) => {
      if (e.eid === eid) {
        e.off = true
        return !remove
      } else {
        return true
      }
    })
    // type && path && this.remove(type, path)
  }
  /**
   * 开启某一个监听
   * @param eid 事件id
   */
  on(eid: number) {
    this.events.forEach((e) => {
      if (e.eid === eid) {
        e.off = false
      }
    })
  }
  close() {
    delete Servers[this.id]
    this.events.forEach(({ path }) => {
      this.remove('get', path)
      this.remove('post', path)
    })
  }
}
