import { Collection } from "collection";

let actors = Collection.create([
  { id: 1, name: "Actor 1" },
  { id: 2, name: "Actor 2" },
]);

console.log(actors);

actors.addEventListener("onadd", (event) => {
  console.log(event.detail.collection);
});

actors.add({ id: 3, name: "Actor 3" });
