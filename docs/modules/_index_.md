[jinter](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Classes

* [Client](../classes/_index_.client.md)
* [Server](../classes/_index_.server.md)

### Type aliases

* [Event](_index_.md#event)

### Variables

* [Servers](_index_.md#const-servers)

## Type aliases

###  Event

Ƭ **Event**: *object*

*Defined in [index.ts:88](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L88)*

#### Type declaration:

* **eid**: *number*

* **path**: *string*

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

*Defined in [index.ts:3](https://github.com/jincdream/Jinter/blob/bc0c789/src/index.ts#L3)*

#### Type declaration:

* \[ **key**: *string*\]: object

* **ClientE**: *EventEmitter*

* **ServerE**: *EventEmitter*
