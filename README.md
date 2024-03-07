# Reactive Collection

Create an array what will emit events when it is modified. This is useful for creating a reactive array that can be used in a reactive context.

### Why use this library?

This library can be used to create a reactive array that will emit events when the data changes. In doing so, logic can be added to the event handlers to update, for example, the UI when the data changes.

For example, a D3 Data Visualization does not update when the data changes. This is because D3 does not have a way to listen for changes in the data, it only concerns it self with updating the UI based on the data it is provided during invocation. This library can be used to create a reactive array that will emit events when the data changes. By binding D3 update logic to these events, Data Visualization updates automatically.

## API

Operations:

- Add an item to the array via standard array methods: `.push(<item>)`
- Add an item to the array via custom method: `.add(<item>)`
- Update an item: `collection[<index>] = <item>`
- Remove an item from the array via standard array methods: `.pop()`
- Remove an item from the array via custom method: `.remove(<item>)`

Events:

- `onadd`: Emitted when an item is added to the array
- `onupdate`: Emitted when an item is updated in the array
- `onremove`: Emitted when an item is removed from the array

## Example

1. Create a collection of actors.

```javascript
import { Collection } from "collection";

let actors = Collection.create([
  { id: 1, name: "Actor 1" },
  { id: 2, name: "Actor 2" },
]);
```

2. Define an generic event handler

```javascript
let eventHandler = (event) => {
  // Direct access to Reactive Collections
  let actors = event.detail.collection;
};
```

3. Add event listeners

```javascript
actors.addEventListener("onadd", eventHandler);
```

4. Add an actor to the collection

```javascript
actors.add({ id: 3, name: "Actor 3" });
```

5. Remove event listeners

```javascript
actors.removeEventListener("onadd", eventHandler);
```
