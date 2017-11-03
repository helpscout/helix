# `extend(...specs)`

Extends the spec shape of the HelixSpec.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `specs` | `object` | Merges the additional objects with the initial spec object. |


### Returns

`HelixSpec`: Renders itself.


### Example

To extend the initial spec shape, pass in a new `object` as an argument. Additional `objects` can be passed in as additional arguments.

```js
const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})

Dinosaur.extend({
  company: 'Jurassic Parkland',
  color: faker.commerce.color()
})

// Dinosaur's spec shape will now be:
// {
//   id: faker.random.number(),
//   name: faker.name.firstName(),
//   location: faker.address.country(),
//   company: 'Jurassic Parkland',
//   color: faker.commerce.color()
// }
```
