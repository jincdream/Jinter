[jinter](../globals.md) › ["index"](../modules/_index_.md) › [Server](_index_.server.md)

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
* [onGet](_index_.server.md#onget)
* [onPost](_index_.server.md#onpost)
* [prefixing](_index_.server.md#private-prefixing)
* [remove](_index_.server.md#remove)
* [run](_index_.server.md#private-run)

## Constructors

###  constructor

\+ **new Server**(`id`: string): *[Server](_index_.server.md)*

*Defined in [index.ts:97](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Server](_index_.server.md)*

## Properties

### `Private` ClientE

• **ClientE**: *EventEmitter | undefined*

*Defined in [index.ts:97](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L97)*

___

### `Private` ServerE

• **ServerE**: *EventEmitter | undefined*

*Defined in [index.ts:96](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L96)*

___

###  events

• **events**: *[Event](../modules/_index_.md#event)[]*

*Defined in [index.ts:95](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L95)*

___

###  id

• **id**: *string*

*Defined in [index.ts:94](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L94)*

## Methods

###  close

▸ **close**(): *void*

*Defined in [index.ts:144](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L144)*

**Returns:** *void*

___

###  off

▸ **off**(`eid`: number): *void*

*Defined in [index.ts:140](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`eid` | number |

**Returns:** *void*

___

###  onGet

▸ **onGet**‹**T**›(`__namedParameters`: object, `callback`: function): *number*

*Defined in [index.ts:130](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L130)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`path` | string |

▪ **callback**: *function*

▸ (`data`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *number*

___

###  onPost

▸ **onPost**‹**T**›(`__namedParameters`: object, `callback`: function): *number*

*Defined in [index.ts:133](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L133)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`path` | string |

▪ **callback**: *function*

▸ (`data`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *number*

___

### `Private` prefixing

▸ **prefixing**(`type`: "post" | "get", `path`: string): *string*

*Defined in [index.ts:105](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | "post" &#124; "get" |
`path` | string |

**Returns:** *string*

___

###  remove

▸ **remove**(`type`: "get" | "post", `path`: string): *void*

*Defined in [index.ts:136](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | "get" &#124; "post" |
`path` | string |

**Returns:** *void*

___

### `Private` run

▸ **run**‹**T**›(`type`: "get" | "post", `path`: string, `callback`: function): *number*

*Defined in [index.ts:108](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L108)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **type**: *"get" | "post"*

▪ **path**: *string*

▪ **callback**: *function*

▸ (`data`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *number*
