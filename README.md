# Reactive Collection

Enhance your data arrays with reactivity. The Reactive Collection library enables arrays to emit events upon modifications, making it indispensable for developing dynamic, data-driven applications. Perfect for integrating with UI frameworks or any scenario requiring real-time data synchronization.

## Why This Library?

The Reactive Collection provides a seamless way to observe changes in your data, emitting events on additions, updates, and removals. This functionality is particularly beneficial for visual data representations that need to update automatically, such as with D3 visualizations, without manual refreshes or polling.

## Features

- **Reactive Operations**: Perform standard array operations while automatically emitting events for changes.
- **Custom Methods**: Utilize enhanced methods like `.add()` and `.remove()` for clearer, more expressive code.
- **Unique Identification**: Every collection comes with a unique identifier, simplifying tracking across your application.
- **Event-Driven**: Listen to `onadd`, `onupdate`, and `onremove` events to easily sync your UI or other components with your data.

## Getting Started

### Installation

```bash
npm install @browser-modules/reactive.collection
```

### Quick Start

1. Create a Collection

```javascript
import { Collection } from "@browser-modules/reactive.collection";

let actors = Collection.create([
  { id: 1, name: "Actor 1" },
  { id: 2, name: "Actor 2" },
]);
```

2. Set Up Event Handlers

```javascript
let onAddition = (event) => {
  // Access the updated collection directly in the event
  console.log(event.detail.collection);
};
```

3. Listen to Events

```javascript
actors.addEventListener("onadd", onAddition);
```

4. Modify the Collection

```javascript
actors.add({ id: 3, name: "Actor 3" });
```

5. Observe the Output

check the console for the updated collection

4. Clean Up

```javascript
actors.removeEventListener("onadd", onAddition);
```
