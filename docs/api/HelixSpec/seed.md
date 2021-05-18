# `seed(seedValue)`

Sets the [Faker](https://github.com/marak/Faker.js/#setting-a-randomness-seed) randomness seed value. This allows you to generate consistent results.

### Arguments

| Argument    | Type     | Description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| `seedValue` | `number` | Seed value to determine the rendered fixture results. |

### Returns

`HelixSpec`: Renders itself.

### Example

To seed your fixture, use the `.seed()` method **before** you use `.generate()`. These methods can even be chained together!

```js
const Dinosaur = createSpec({
  id: faker.datatype.number(),
  name: faker.name.firstName(),
  location: faker.address.country(),
});

Dinosaur.seed(3).generate();
// { id: 55079, name: 'Antone', location: 'Pitcairn Islands' }
```
