import EventEmitter from 'eventemitter3'

const ServerE = new EventEmitter()
const ClientE = new EventEmitter()
const Servers: {
  [key: string]: boolean
} = {}

export class Client {
  id: string
  emitter: any
  constructor(id: string) {
    this.id = id
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
    let { emitter } = this
    if (emitter) {
      this.emitter = void 0
      return emitter(data)
    }
    return await new Promise((res) => {
      ClientE.once(`${type}+client+${server}+${path}`, (resData) => {
        res(resData)
      })
      ServerE.emit(`${type}+${server}+${path}`, data)
    })
  }
}

export class Server {
  id: string
  events: any[]
  constructor(id: string) {
    this.id = id
    this.events = []
    Servers[`server+${id}`] = true
  }
  prefixing(type: 'post' | 'get', path: string) {
    return `${type}+${this.id}+${path}`
  }
  onGet<T = any>({ path }: { path: string }, callback: (data: T) => void) {
    this.run<T>('get', path, callback)
  }
  onPost<T = any>({ path }: { path: string }, callback: (data: T) => void) {
    this.run<T>('post', path, callback)
  }
  run<T>(type: 'get' | 'post', path: string, callback: (data: T) => void) {
    let name = this.prefixing(type, path)
    this.events.push(name)
    ServerE.on(name, async (body) => {
      if (callback) {
        let res = await callback(body)
        ClientE.emit(`${type}+client+${this.id}+${path}`, res)
      }
    })
  }
  remove(type: 'get' | 'post', path: string) {
    let name = this.prefixing(type, path)
    ServerE.removeListener(name)
  }
  close() {
    Servers[`server+${this.id}`] = false
    this.events.forEach((name) => ServerE.removeListener(name))
  }
}
