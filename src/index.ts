import EventEmitter from 'eventemitter3'

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
  id: string
  emitter: any
  ServerE: EventEmitter | undefined
  ClientE: EventEmitter | undefined
  constructor(id: string) {
    this.id = id
    let emt = Servers[id]
    this.ServerE = emt.ServerE
    this.ClientE = emt.ClientE
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
    server: string
    path: string
    data: D
  }) {
    return await this.run<T, D>(server, path, data, 'get')
  }
  async post<T = any, D = any>({
    server,
    path,
    body,
  }: {
    server: string
    path: string
    body: D
  }) {
    return await this.run<T, D>(server, path, body, 'post')
  }
  async run<T, D>(
    server: string,
    path: string,
    data: D,
    type: 'get' | 'post'
  ): Promise<T> {
    let { emitter, ServerE, ClientE } = this
    if (emitter) {
      this.emitter = void 0
      return emitter(data)
    }
    return await new Promise((res) => {
      if (!ServerE || !ClientE) return res()
      let serverEvName = `${type}+${server}+${path}`
      let hasServer =
        ServerE.eventNames().findIndex((v) => v === serverEvName) > -1
      if (!hasServer) return res(void 0)
      ClientE.once(`${type}+client+${server}+${path}`, (resData) => {
        res(resData)
      })
      ServerE.emit(serverEvName, data)
    })
  }
}
type Event = {
  path: string
  eid: number
  type: 'get' | 'post'
}
export class Server {
  id: string
  events: Event[]
  private ServerE: EventEmitter | undefined
  private ClientE: EventEmitter | undefined
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
  private run<T>(
    type: 'get' | 'post',
    path: string,
    callback: (data: T) => void
  ) {
    let serverName = this.prefixing(type, path)
    let clientName = `${type}+client+${this.id}+${path}`
    let eid = this.events.length
    this.events.push({
      path,
      eid,
      type,
    })
    this.ServerE &&
      this.ServerE.on(serverName, async (body) => {
        if (callback) {
          let res = await callback(body)
          this.ClientE && this.ClientE.emit(clientName, res)
        }
      })
    return eid
  }
  onGet<T = any>({ path }: { path: string }, callback: (data: T) => void) {
    return this.run<T>('get', path, callback)
  }
  onPost<T = any>({ path }: { path: string }, callback: (data: T) => void) {
    return this.run<T>('post', path, callback)
  }
  remove(type: 'get' | 'post', path: string) {
    let name = this.prefixing(type, path)
    this.ServerE && this.ServerE.removeListener(name)
  }
  off(eid: number) {
    let { path, type } = this.events.find((e) => e.eid === eid) || {}
    type && path && this.remove(type, path)
  }
  close() {
    delete Servers[this.id]
    this.events.forEach(({ path }) => {
      this.remove('get', path)
      this.remove('post', path)
    })
  }
}
