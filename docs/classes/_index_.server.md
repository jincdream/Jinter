[jinter](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Server](_index_.server.md)

# Class: Server

## Hierarchy

* **Server**

## Index

### Constructors

* [constructor](_index_.server.md#constructor)

### Properties

* [ClientE](_index_.server.md#private-cliente)
* [ServerE](_index_.server.md#private-servere)
* [events](_index_.server.md#events)
* [id](_index_.server.md#id)

### Methods

* [close](_index_.server.md#close)
* [off](_index_.server.md#off)
* [on](_index_.server.md#on)
* [onGet](_index_.server.md#onget)
* [onPost](_index_.server.md#onpost)
* [prefixing](_index_.server.md#private-prefixing)
* [remove](_index_.server.md#remove)
* [run](_index_.server.md#private-run)

## Constructors

###  constructor

\+ **new Server**(`id`: string): *[Server](_index_.server.md)*

*Defined in [index.ts:118](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Server](_index_.server.md)*

## Properties

### `Private` ClientE

• **ClientE**: *EventEmitter*

*Defined in [index.ts:118](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L118)*

___

### `Private` ServerE

• **ServerE**: *EventEmitter*

*Defined in [index.ts:117](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L117)*

___

###  events

• **events**: *[Event](../modules/_index_.md#event)‹any, any›[]*

*Defined in [index.ts:116](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L116)*

___

###  id

• **id**: *string*

*Defined in [index.ts:115](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L115)*

## Methods

###  close

▸ **close**(): *void*

*Defined in [index.ts:216](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L216)*

**Returns:** *void*

___

###  off

▸ **off**(`eid`: number): *void*

*Defined in [index.ts:197](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L197)*

关闭某一个监听

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eid` | number | 事件id  |

**Returns:** *void*

___

###  on

▸ **on**(`eid`: number): *void*

*Defined in [index.ts:209](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L209)*

开启某一个监听

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eid` | number | 事件id  |

**Returns:** *void*

___

###  onGet

▸ **onGet**‹**T**, **R**›(`__namedParameters`: object, `callback`: function): *number*

*Defined in [index.ts:177](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L177)*

**Type parameters:**

▪ **T**

▪ **R**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`path` | string |

▪ **callback**: *function*

▸ (`data`: T): *Promise‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *number*

___

###  onPost

▸ **onPost**‹**T**, **R**›(`__namedParameters`: object, `callback`: function): *number*

*Defined in [index.ts:183](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L183)*

**Type parameters:**

▪ **T**

▪ **R**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`path` | string |

▪ **callback**: *function*

▸ (`data`: T): *Promise‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *number*

___

### `Private` prefixing

▸ **prefixing**(`type`: "post" | "get", `path`: string): *string*

*Defined in [index.ts:126](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | "post" &#124; "get" |
`path` | string |

**Returns:** *string*

___

###  remove

▸ **remove**(`type`: "get" | "post", `path`: string): *void*

*Defined in [index.ts:189](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L189)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | "get" &#124; "post" |
`path` | string |

**Returns:** *void*

___

### `Private` run

▸ **run**‹**T**, **R**›(`type`: "get" | "post", `path`: string, `callback`: function): *number*

*Defined in [index.ts:129](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L129)*

**Type parameters:**

▪ **T**

▪ **R**

**Parameters:**

▪ **type**: *"get" | "post"*

▪ **path**: *string*

▪ **callback**: *function*

▸ (`data`: T): *Promise‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *number*
