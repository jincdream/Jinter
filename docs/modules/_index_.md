[jinter](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Classes

* [Client](../classes/_index_.client.md)
* [Server](../classes/_index_.server.md)

### Type aliases

* [Event](_index_.md#event)

### Variables

* [Servers](_index_.md#const-servers)
* [channel](_index_.md#channel)

## Type aliases

###  Event

Ƭ **Event**: *object*

*Defined in [index.ts:106](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L106)*

#### Type declaration:

* **callback**(): *function*

  * (`data`: T): *Promise‹R›*

* **eid**: *number*

* **off**: *boolean*

* **path**: *string*

* **serverName**: *string*

* **type**: *"get" | "post"*

## Variables

### `Const` Servers

• **Servers**: *object* = new Proxy(
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

*Defined in [index.ts:3](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L3)*

#### Type declaration:

* \[ **key**: *string*\]: object

* **ClientE**: *EventEmitter*

* **ServerE**: *EventEmitter*

___

###  channel

• **channel**: *number* = 0

*Defined in [index.ts:2](https://github.com/jincdream/Jinter/blob/1459b97/src/index.ts#L2)*
