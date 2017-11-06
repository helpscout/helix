# `fake(value)`

You can do this by using the `fake()` method that comes with [Faker.js](https://github.com/marak/Faker.js/#fakerfake). Note, you'd still need to use `faker` supplied by Helix for consistent results.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `value` | `string` | Values to compute, indicated by `{{curly bases}}`.


### Returns

`string`: Returns a string with computed values.


### Example

Simply pass a string into `faker.fake()`, and add the faker methods with `{{curly braces}}`.
Just a heads up, don't add `faker.` in front of the computed methods, and don't instantiate them.

```js
import { createSpec, faker } from '@helpscout/helix'

const Dinosaur = createSpec({
  id: faker.random.number(),
  fullName: faker.fake('{{name.firstName}} {{name.lastName}}')
})

Dinosaur.generate()
// {
//   id: 324191,
//   fullName: 'Sauna Marks'
// }
```
