# `afterGenerate(callback(data) => { ... })`

A hook to adjust the fixture output (`object`) of the HelixSpec that is called right after the fixture is [generated](./generate.md).


### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `callback` | `function` | Callback function to adjust the fixture data. |
| `data` | `object` | Generated fixture data passed into the `callback`. |


### Returns

`HelixSpec`: Returns itself.


### Example

```js
const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})

Dinosaur.afterGenerate(data => {
  const { name } = data
  return {
    name,
    location: 'Mexico',
    status: 'Happy',
    email: 'noop@superprivacy.com'
  }
})

Dinosaur.generate()
// {
//   name: 'Alice',
//   location: 'Mexico'
//   status: 'Happy',
//   email: 'noop@superprivacy.com'
// }
```
