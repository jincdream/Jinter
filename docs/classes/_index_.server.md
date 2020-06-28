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

*Defined in [index.ts:122](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Server](_index_.server.md)*

## Properties

### `Private` ClientE

• **ClientE**: *EventEmitter*

*Defined in [index.ts:122](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L122)*

___

### `Private` ServerE

• **ServerE**: *EventEmitter*

*Defined in [index.ts:121](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L121)*

___

###  events

• **events**: *[Event](../modules/_index_.md#event)‹any, any›[]*

*Defined in [index.ts:120](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L120)*

___

###  id

• **id**: *string*

*Defined in [index.ts:119](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L119)*

## Methods

###  close

▸ **close**(): *void*

*Defined in [index.ts:227](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L227)*

**Returns:** *void*

___

###  off

▸ **off**(`eid`: number, `remove?`: undefined | false | true): *void*

*Defined in [index.ts:205](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L205)*

关闭某一个监听

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eid` | number | 事件id  |
`remove?` | undefined &#124; false &#124; true | - |

**Returns:** *void*

___

###  on

▸ **on**(`eid`: number): *void*

*Defined in [index.ts:220](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L220)*

开启某一个监听

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`eid` | number | 事件id  |

**Returns:** *void*

___

###  onGet

▸ **onGet**‹**T**, **R**›(`__namedParameters`: object, `callback`: function): *number*

*Defined in [index.ts:181](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L181)*

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

*Defined in [index.ts:191](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L191)*

**`todo`** 
return a success or error flag

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

*Defined in [index.ts:130](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | "post" &#124; "get" |
`path` | string |

**Returns:** *string*

___

###  remove

▸ **remove**(`type`: "get" | "post", `path`: string): *void*

*Defined in [index.ts:197](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L197)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | "get" &#124; "post" |
`path` | string |

**Returns:** *void*

___

### `Private` run

▸ **run**‹**T**, **R**›(`type`: "get" | "post", `path`: string, `callback`: function): *number*

*Defined in [index.ts:133](https://github.com/jincdream/Jinter/blob/f3bd886/src/index.ts#L133)*

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
