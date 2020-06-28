import { Client, Server } from '../index'
describe(`Greeter`, () => {
  it(`get server`, async () => {
    const mockFn = jest.fn()
    const ID = 'aw'
    const server = new Server(ID)
    const client = new Client(ID)
    let fnRz
    server.onGet({ path: '/test' }, async (data) => {
      fnRz = mockFn(data)
      return data
    })
    let result = await client.get({
      path: '/test',
      server: ID,
      data: { a: 123 },
    })

    expect(fnRz).toBeUndefined()
    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith({ a: 123 })
    expect(result).toEqual({ a: 123 })
  })

  it(`post server`, async () => {
    const mockFn = jest.fn()
    const ID = 'aq'
    const server = new Server(ID)
    const client = new Client(ID)
    server.onPost({ path: '/test' }, async (data) => mockFn(data))
    let result = await client.post({
      path: '/test',
      server: ID,
      body: { a: 123 },
    })
    expect(result).toBeUndefined()
    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith({ a: 123 })
  })

  it(`remove api`, async () => {
    const mockFnGet = jest.fn()
    const mockFnPost = jest.fn()
    const ID = 'add'
    const server = new Server(ID)
    const client = new Client(ID)
    server.onPost({ path: '/test' }, async (data) => mockFnPost(data))
    server.onGet({ path: '/test' }, async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function() {
      let POSTResult = await client.post({
        path: '/test',
        server: ID,
        body: { a: 123 },
      })
      let GETResult = await client.get({
        path: '/test',
        server: ID,
        data: { a: 123 },
      })
      return { POSTResult, GETResult }
    }
    let { POSTResult, GETResult } = await trigger()

    expect(GETResult).toEqual({ a: 123 })
    expect(POSTResult).toBeUndefined()
    expect(mockFnGet).toBeCalled()
    expect(mockFnPost).toBeCalled()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnGet).toHaveBeenCalledWith({ a: 123 })
    expect(mockFnPost).toHaveBeenCalledWith({ a: 123 })

    server.remove('get', '/test')
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(2)

    server.remove('post', '/test')
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(2)
  })
  it(`remove api 2`, async () => {
    const mockFnPost = jest.fn()
    const mockFnPost1 = jest.fn()
    const ID = 'remove2'
    const server = new Server(ID)
    const client = new Client(ID)

    server.onPost({path: "/test"}, async (data)=> mockFnPost(data) )
    server.onPost({path: "/test"}, async (data)=> mockFnPost1(data) )

    await client.post({path: "/test", body: {a: 1}})
    expect(mockFnPost).toBeCalled()
    expect(mockFnPost1).toBeCalled()
    expect(mockFnPost).toHaveBeenCalledWith({ a: 1 })
    expect(mockFnPost1).toHaveBeenCalledWith({ a: 1 })
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnPost1).toBeCalledTimes(1)

    server.remove("post", "/test")
    await client.post({path: "/test", body: {a: 1}})
    await client.post({path: "/test", body: {a: 1}})
    await client.post({path: "/test", body: {a: 1}})
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnPost1).toBeCalledTimes(1)

  })
  it(`close api`, async () => {
    const mockFnGet = jest.fn()
    const mockFnPost = jest.fn()
    const ID = 'aa'
    const server = new Server(ID)
    const client = new Client(ID)
    server.onPost({ path: '/test' }, async (data) => mockFnPost(data))
    server.onGet({ path: '/test' }, async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function() {
      let POSTResult = await client.post({
        path: '/test',
        server: ID,
        body: { a: 123 },
      })
      let GETResult = await client.get({
        path: '/test',
        server: ID,
        data: { a: 123 },
      })
      return { POSTResult, GETResult }
    }
    server.close()
    let { POSTResult, GETResult } = await trigger()

    expect(POSTResult).toBeUndefined()
    expect(GETResult).toBeUndefined()
    expect(mockFnGet).toBeCalledTimes(0)
    expect(mockFnPost).toBeCalledTimes(0)

    new Server(ID).onGet({ path: '/test' }, async (data) => {
      mockFnGet(data)
      return data
    })
  })

  it(`off api`, async () => {
    const mockFnGet = jest.fn()
    const mockFnPost = jest.fn()
    const ID = 'ac'
    const server = new Server(ID)
    const client = new Client(ID)
    let POSTEventID = server.onPost({ path: '/test' }, async (data) =>
      mockFnPost(data)
    )
    let GetEventID = server.onGet({ path: '/test' }, async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function() {
      let POSTResult = await client.post({
        path: '/test',
        server: ID,
        body: { a: 123 },
      })
      let GETResult = await client.get({
        path: '/test',
        server: ID,
        data: { a: 123 },
      })
      return { POSTResult, GETResult }
    }

    server.off(POSTEventID)
    server.off(GetEventID)

    let { POSTResult, GETResult } = await trigger()

    expect(POSTResult).toBeUndefined()
    expect(GETResult).toBeUndefined()
    expect(mockFnGet).toBeCalledTimes(0)
    expect(mockFnPost).toBeCalledTimes(0)
  })

  it(`off api 2`, async () => {
    const mockFnGet = jest.fn()
    const mockFnPost = jest.fn()
    const ID = 'av'
    const server = new Server(ID)
    const client = new Client(ID)
    let postID = server.onPost({ path: '/test' }, async (data) =>
      mockFnPost(data)
    )
    let getID = server.onGet({ path: '/test' }, async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function() {
      let POSTResult = await client.post({
        path: '/test',
        server: ID,
        body: { a: 123 },
      })
      let GETResult = await client.get({
        path: '/test',
        server: ID,
        data: { a: 123 },
      })
      return { POSTResult, GETResult }
    }
    let { POSTResult, GETResult } = await trigger()

    expect(GETResult).toEqual({ a: 123 })
    expect(POSTResult).toBeUndefined()
    expect(mockFnGet).toBeCalled()
    expect(mockFnPost).toBeCalled()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnGet).toHaveBeenCalledWith({ a: 123 })
    expect(mockFnPost).toHaveBeenCalledWith({ a: 123 })

    server.off(getID)
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(2)

    server.off(postID)
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(2)
  })
  it(`off api 3`, async () => {
    const mockFnGet = jest.fn()
    const mockFnPost = jest.fn()
    const mockFnPost2 = jest.fn()
    const ID = 'off3'
    const server = new Server(ID)
    const client = new Client(ID)
    let postID = server.onPost({ path: '/test' }, async (data) =>
      mockFnPost(data)
    )
    let postID2 = server.onPost({ path: '/test' }, async (data) =>
      mockFnPost2(data)
    )
    let getID = server.onGet({ path: '/test' }, async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function() {
      let POSTResult = await client.post({
        path: '/test',
        server: ID,
        body: { a: 123 },
      })
      let GETResult = await client.get({
        path: '/test',
        server: ID,
        data: { a: 123 },
      })
      return { POSTResult, GETResult }
    }
    let { POSTResult, GETResult } = await trigger()

    expect(GETResult).toEqual({ a: 123 })
    expect(POSTResult).toBeUndefined()
    expect(mockFnGet).toBeCalled()
    expect(mockFnPost).toBeCalled()
    expect(mockFnPost2).toBeCalled()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnPost2).toBeCalledTimes(1)
    expect(mockFnGet).toHaveBeenCalledWith({ a: 123 })
    expect(mockFnPost).toHaveBeenCalledWith({ a: 123 })
    expect(mockFnPost2).toHaveBeenCalledWith({ a: 123 })

    server.off(getID)
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(2)
    expect(mockFnPost2).toBeCalledTimes(2)

    server.off(postID)
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(2)
    expect(mockFnPost2).toBeCalledTimes(3)

    server.off(postID2)
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1)
    expect(mockFnPost).toBeCalledTimes(2)
    expect(mockFnPost2).toBeCalledTimes(3)

    server.on(getID)
    await trigger()
    expect(mockFnGet).toBeCalledTimes(2)
    expect(mockFnPost).toBeCalledTimes(2)
    expect(mockFnPost2).toBeCalledTimes(3)

    server.on(postID)
    await trigger()
    expect(mockFnGet).toBeCalledTimes(3)
    expect(mockFnPost).toBeCalledTimes(3)
    expect(mockFnPost2).toBeCalledTimes(3)

    server.on(postID2)
    await trigger()
    expect(mockFnGet).toBeCalledTimes(4)
    expect(mockFnPost).toBeCalledTimes(4)
    expect(mockFnPost2).toBeCalledTimes(4)

    server.remove('post', '/test')
    await trigger()
    expect(mockFnGet).toBeCalledTimes(5)
    expect(mockFnPost).toBeCalledTimes(4)
    expect(mockFnPost2).toBeCalledTimes(4)

    server.remove('get', '/test')
    await trigger()
    expect(mockFnGet).toBeCalledTimes(5)
    expect(mockFnPost).toBeCalledTimes(4)
    expect(mockFnPost2).toBeCalledTimes(4)
  })
  it(`off api: remove`, async () => {
    const mockFnPost = jest.fn()
    const mockFnPost2 = jest.fn()
    const ID = 'off3'
    const server = new Server(ID)
    const client = new Client(ID)
    let postID = server.onPost({ path: '/test' }, async (data) =>
      mockFnPost(data)
    )
    let postID2 = server.onPost({ path: '/test' }, async (data) =>
      mockFnPost2(data)
    )
    const trigger = async function() {
      let POSTResult = await client.post({
        path: '/test',
        server: ID,
        body: { a: 123 },
      })
      return { POSTResult }
    }
    let { POSTResult } = await trigger()

    expect(POSTResult).toBeUndefined()
    expect(mockFnPost).toBeCalled()
    expect(mockFnPost2).toBeCalled()
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnPost2).toBeCalledTimes(1)
    expect(mockFnPost).toHaveBeenCalledWith({ a: 123 })
    expect(mockFnPost2).toHaveBeenCalledWith({ a: 123 })

    server.off(postID, true)
    await trigger()
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnPost2).toBeCalledTimes(2)

    server.off(postID2, true)
    await trigger()
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnPost2).toBeCalledTimes(2)

    await trigger()
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnPost2).toBeCalledTimes(2)

    server.on(postID2)
    await trigger()
    expect(mockFnPost).toBeCalledTimes(1)
    expect(mockFnPost2).toBeCalledTimes(2)
  })
  it(`two server`, async () => {
    const mockFn = jest.fn()
    const mockFn2 = jest.fn()
    const ID = 'aw1dw'
    const server = new Server(ID)
    const server2 = new Server(ID + ID)
    const client = new Client()
    const client2 = new Client(ID)

    server.onGet({ path: '/test' }, async (data) => {
      mockFn(data)
      return data
    })

    server2.onGet({ path: '/test/server2' }, async (data) => {
      mockFn2(data)
      return data
    })

    let result = await client.get({
      path: '/test',
      server: ID,
      data: { a: 123 },
    })

    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith({ a: 123 })
    expect(result).toEqual({ a: 123 })

    let result2 = await client.get({
      path: '/test/server2',
      server: ID + ID,
      data: { a: 222 },
    })

    expect(mockFn2).toBeCalled()
    expect(mockFn2).toBeCalledTimes(1)
    expect(mockFn2).toHaveBeenCalledWith({ a: 222 })
    expect(result2).toEqual({ a: 222 })

    let result3 = await client2.get({
      path: '/test',
      data: { a: 333 },
    })
    expect(mockFn).toBeCalledTimes(2)
    expect(mockFn).toHaveBeenCalledWith({ a: 333 })
    expect(result3).toEqual({ a: 333 })
  })

  it(`concurrent`, async () => {
    const mockFn = jest.fn()
    const ID = 'ccc'
    const server = new Server(ID)
    const client = new Client()

    server.onGet({ path: '/get/data' }, (param) => {
      return new Promise((res) => {
        mockFn()
        setTimeout(() => {
          res(param)
        }, Math.random() * 100)
      })
    })

    let [r1, r2, r3] = await Promise.all([
      client.get({ server: ID, path: '/get/data', data: { id: 1 } }),
      client.get({ server: ID, path: '/get/data', data: { id: 2 } }),
      client.get({ server: ID, path: '/get/data', data: { id: 3 } }),
    ])

    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledTimes(3)
    expect(r1).toEqual({ id: 1 })
    expect(r2).toEqual({ id: 2 })
    expect(r3).toEqual({ id: 3 })
  })

  it(`get server throw error`, async () => {
    const ID = 'throw'
    const server = new Server(ID)

    server.onPost({ path: '/set/data' }, async () => {})
    server.onPost({ path: '/set/data' }, async () => {})

    server.onGet({ path: '/get/data' }, async () => {})

    expect(() => {
      server.onGet({ path: '/get/data' }, async () => {})
    }).toThrowError(
      new Error(
        `[Jinter Error]: Get Serer(${'/get/data'}) only can be listening once, you should remove one`
      )
    )
  })


})
