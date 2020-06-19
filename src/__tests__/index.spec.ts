import {Client,Server} from '../index'
describe(`Greeter`, () => {

  it(`get server`, async () => {
    const mockFn = jest.fn();
    const ID = "aw"
    const server = new Server(ID)
    const client = new Client(ID)
    let fnRz
    server.onGet({path: "/test"},async (data) => {
      fnRz = mockFn(data)
      return data
    })
    let result = await client.get({path: "/test",server: ID,data: {a: 123}})

    // 断言mockFn的执行后返回undefined
    expect(fnRz).toBeUndefined();
    // 断言mockFn被调用
    expect(mockFn).toBeCalled();
    // 断言mockFn被调用了一次
    expect(mockFn).toBeCalledTimes(1);
    // 断言mockFn传入的参数
    expect(mockFn).toHaveBeenCalledWith({a: 123});
    expect(result).toEqual({a: 123})
  })

  it(`post server`, async () => {
    const mockFn = jest.fn();
    const ID = "aq"
    const server = new Server(ID)
    const client = new Client(ID)
    server.onPost({path: "/test"},async (data) => mockFn(data))
    let result = await client.post({path: "/test",server: ID,body: {a: 123} })
    // 断言mockFn的执行后返回undefined
    expect(result).toBeUndefined();
    // 断言mockFn被调用
    expect(mockFn).toBeCalled();
    // 断言mockFn被调用了一次
    expect(mockFn).toBeCalledTimes(1);
    // 断言mockFn传入的参数为
    expect(mockFn).toHaveBeenCalledWith({a: 123});
  })

  it(`remove api`, async () => {
    const mockFnGet = jest.fn();
    const mockFnPost = jest.fn();
    const ID = "add"
    const server = new Server(ID)
    const client = new Client(ID)
    server.onPost({path: "/test"},async (data) => mockFnPost(data))
    server.onGet({path: "/test"},async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function (){
      let POSTResult = await client.post({path: "/test",server: ID,body: {a: 123} })
      let GETResult = await client.get({path: "/test",server: ID,data: {a: 123} })
      return { POSTResult, GETResult }
    }
    let {POSTResult,GETResult} = await trigger()
    
    expect(GETResult).toEqual({a: 123})
    // 断言mockFn的执行后返回undefined
    expect(POSTResult).toBeUndefined();
    // 断言mockFn被调用
    expect(mockFnGet).toBeCalled();
    expect(mockFnPost).toBeCalled();
    // 断言mockFn被调用了n次
    expect(mockFnGet).toBeCalledTimes(1);
    expect(mockFnPost).toBeCalledTimes(1);
    // 断言mockFn传入的参数为
    expect(mockFnGet).toHaveBeenCalledWith({a: 123});
    expect(mockFnPost).toHaveBeenCalledWith({a: 123});

    server.remove("get", "/test")
    await trigger()
    // 断言mockFn被调用了n次
    expect(mockFnGet).toBeCalledTimes(1);
    expect(mockFnPost).toBeCalledTimes(2);

    server.remove("post", "/test")
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1);
    expect(mockFnPost).toBeCalledTimes(2);
    
  })

  it(`close api`, async () => {
    const mockFnGet = jest.fn();
    const mockFnPost = jest.fn();
    const ID = "aa"
    const server = new Server(ID)
    const client = new Client(ID)
    server.onPost({path: "/test"},async (data) => mockFnPost(data))
    server.onGet({path: "/test"},async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function (){
      let POSTResult = await client.post({path: "/test",server: ID,body: {a: 123} })
      let GETResult = await client.get({path: "/test",server: ID,data: {a: 123} })
      return { POSTResult, GETResult }
    }
    server.close()
    let {POSTResult,GETResult} = await trigger()
    
    expect(POSTResult).toBeUndefined();
    expect(GETResult).toBeUndefined();
    // 断言mockFn被调用了n次
    expect(mockFnGet).toBeCalledTimes(0);
    expect(mockFnPost).toBeCalledTimes(0);
  })

  it(`off api`, async () => {
    const mockFnGet = jest.fn();
    const mockFnPost = jest.fn();
    const ID = "ac"
    const server = new Server(ID)
    const client = new Client(ID)
    let POSTEventID = server.onPost({path: "/test"},async (data) => mockFnPost(data))
    let GetEventID = server.onGet({path: "/test"},async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function (){
      let POSTResult = await client.post({path: "/test",server: ID,body: {a: 123} })
      let GETResult = await client.get({path: "/test",server: ID,data: {a: 123} })
      return { POSTResult, GETResult }
    }
    
    server.off(POSTEventID)
    server.off(GetEventID)

    let {POSTResult,GETResult} = await trigger()
    
    expect(POSTResult).toBeUndefined();
    expect(GETResult).toBeUndefined();
    // 断言mockFn被调用了n次
    expect(mockFnGet).toBeCalledTimes(0);
    expect(mockFnPost).toBeCalledTimes(0);
  })

  it(`off api 2`, async () => {
    const mockFnGet = jest.fn();
    const mockFnPost = jest.fn();
    const ID = "av"
    const server = new Server(ID)
    const client = new Client(ID)
    let postID = server.onPost({path: "/test"},async (data) => mockFnPost(data))
    let getID = server.onGet({path: "/test"},async (data) => {
      mockFnGet(data)
      return data
    })
    const trigger = async function (){
      let POSTResult = await client.post({path: "/test",server: ID,body: {a: 123} })
      let GETResult = await client.get({path: "/test",server: ID,data: {a: 123} })
      return { POSTResult, GETResult }
    }
    let {POSTResult,GETResult} = await trigger()
    
    expect(GETResult).toEqual({a: 123})
    // 断言mockFn的执行后返回undefined
    expect(POSTResult).toBeUndefined();
    // 断言mockFn被调用
    expect(mockFnGet).toBeCalled();
    expect(mockFnPost).toBeCalled();
    // 断言mockFn被调用了n次
    expect(mockFnGet).toBeCalledTimes(1);
    expect(mockFnPost).toBeCalledTimes(1);
    // 断言mockFn传入的参数为
    expect(mockFnGet).toHaveBeenCalledWith({a: 123});
    expect(mockFnPost).toHaveBeenCalledWith({a: 123});

    server.off(getID)
    await trigger()
    // 断言mockFn被调用了n次
    // 断言mockFn被调用了n次
    expect(mockFnGet).toBeCalledTimes(1);
    expect(mockFnPost).toBeCalledTimes(2);

    server.off(postID)
    server.remove("post", "/test")
    await trigger()
    expect(mockFnGet).toBeCalledTimes(1);
    expect(mockFnPost).toBeCalledTimes(2);
  })
})
