[jinter](../globals.md) › ["index"](../modules/_index_.md) › [Client](_index_.client.md)

# Class: Client

## Hierarchy

* **Client**

## Index

### Constructors

* [constructor](_index_.client.md#constructor)

### Properties

* [ClientE](_index_.client.md#cliente)
* [ServerE](_index_.client.md#servere)
* [emitter](_index_.client.md#emitter)
* [id](_index_.client.md#id)

### Methods

* [get](_index_.client.md#get)
* [post](_index_.client.md#post)
* [run](_index_.client.md#run)
* [use](_index_.client.md#use)

## Constructors

###  constructor

\+ **new Client**(`id`: string): *[Client](_index_.client.md)*

*Defined in [index.ts:31](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Client](_index_.client.md)*

## Properties

###  ClientE

• **ClientE**: *EventEmitter | undefined*

*Defined in [index.ts:31](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L31)*

___

###  ServerE

• **ServerE**: *EventEmitter | undefined*

*Defined in [index.ts:30](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L30)*

___

###  emitter

• **emitter**: *any*

*Defined in [index.ts:29](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L29)*

___

###  id

• **id**: *string*

*Defined in [index.ts:28](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L28)*

## Methods

###  get

▸ **get**‹**T**, **D**›(`__namedParameters`: object): *Promise‹T›*

*Defined in [index.ts:42](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L42)*

**Type parameters:**

▪ **T**

▪ **D**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`data` | D |
`path` | string |
`server` | string |

**Returns:** *Promise‹T›*

___

###  post

▸ **post**‹**T**, **D**›(`__namedParameters`: object): *Promise‹T›*

*Defined in [index.ts:53](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L53)*

**Type parameters:**

▪ **T**

▪ **D**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | D |
`path` | string |
`server` | string |

**Returns:** *Promise‹T›*

___

###  run

▸ **run**‹**T**, **D**›(`server`: string, `path`: string, `data`: D, `type`: "get" | "post"): *Promise‹T›*

*Defined in [index.ts:64](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L64)*

**Type parameters:**

▪ **T**

▪ **D**

**Parameters:**

Name | Type |
------ | ------ |
`server` | string |
`path` | string |
`data` | D |
`type` | "get" &#124; "post" |

**Returns:** *Promise‹T›*

___

###  use

▸ **use**‹**T**›(`emitter`: function): *this*

*Defined in [index.ts:38](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L38)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **emitter**: *function*

▸ (): *Promise‹T› | any*

**Returns:** *this*
