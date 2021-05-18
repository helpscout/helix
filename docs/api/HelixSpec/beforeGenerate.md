# `beforeGenerate(callback(shape) => { ... })`

A hook to adjust the shape (`object`) of the HelixSpec that is called right before the fixture is [generated](./generate.md).

### Arguments

| Argument   | Type       | Description                                  |
| ---------- | ---------- | -------------------------------------------- |
| `callback` | `function` | Callback function to adjust the Helix shape. |
| `shape`    | `object`   | Helix shape passed into the `callback`.      |

### Returns

`HelixSpec`: Returns itself.

### Example

```js
const Dinosaur = createSpec({
  id: faker.datatype.number(),
  name: faker.name.firstName(),
  location: faker.address.country(),
});

Dinosaur.beforeGenerate((shape) => {
  const { id, name } = shape;
  return {
    id,
    name,
    location: "Mexico",
    status: "Happy",
    email: faker.internet.email(),
  };
});

Dinosaur.generate();
// {
//   id: 1231,
//   name: 'Alice',
//   location: 'Mexico'
//   status: 'Happy',
//   email: 'alice@dinosaur.us'
// }
```
