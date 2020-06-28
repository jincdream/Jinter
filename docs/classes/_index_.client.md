[jinter](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Client](_index_.client.md)

# Class: Client

## Hierarchy

* **Client**

## Index

### Constructors

* [constructor](_index_.client.md#constructor)

### Properties

* [ClientE](_index_.client.md#optional-cliente)
* [ServerE](_index_.client.md#optional-servere)
* [emitter](_index_.client.md#emitter)
* [id](_index_.client.md#optional-id)

### Methods

* [get](_index_.client.md#get)
* [post](_index_.client.md#post)
* [run](_index_.client.md#private-run)
* [use](_index_.client.md#use)

## Constructors

###  constructor

\+ **new Client**(`id?`: undefined | string): *[Client](_index_.client.md)*

*Defined in [index.ts:31](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`id?` | undefined &#124; string |

**Returns:** *[Client](_index_.client.md)*

## Properties

### `Optional` ClientE

• **ClientE**? : *EventEmitter*

*Defined in [index.ts:31](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L31)*

___

### `Optional` ServerE

• **ServerE**? : *EventEmitter*

*Defined in [index.ts:30](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L30)*

___

###  emitter

• **emitter**: *any*

*Defined in [index.ts:29](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L29)*

___

### `Optional` id

• **id**? : *undefined | string*

*Defined in [index.ts:28](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L28)*

## Methods

###  get

▸ **get**‹**T**, **D**›(`__namedParameters`: object): *Promise‹T›*

*Defined in [index.ts:44](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L44)*

**Type parameters:**

▪ **T**

▪ **D**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`data` | D |
`path` | string |
`server` | undefined &#124; string |

**Returns:** *Promise‹T›*

___

###  post

▸ **post**‹**T**, **D**›(`__namedParameters`: object): *Promise‹T›*

*Defined in [index.ts:55](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L55)*

**Type parameters:**

▪ **T**

▪ **D**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | D |
`path` | string |
`server` | undefined &#124; string |

**Returns:** *Promise‹T›*

___

### `Private` run

▸ **run**‹**T**, **D**›(`path`: string, `data`: D, `type`: "get" | "post", `server?`: undefined | string): *Promise‹T›*

*Defined in [index.ts:66](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L66)*

**Type parameters:**

▪ **T**

▪ **D**

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`data` | D |
`type` | "get" &#124; "post" |
`server?` | undefined &#124; string |

**Returns:** *Promise‹T›*

___

###  use

▸ **use**‹**T**›(`emitter`: function): *this*

*Defined in [index.ts:40](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L40)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **emitter**: *function*

▸ (): *Promise‹T› | any*

**Returns:** *this*
