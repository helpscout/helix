# `computed(props)(callback)`

To have more control over your computed values, you can use the `faker.computed()` method. `computed()` is a special method Helix has extended onto Faker.js, and isn't available in the default Faker.js library.

**Note: `faker.computed()` has been deprecated. Please use `[derived()](../derived.md)` instead.**

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `props` | `object` | Shape of the Faker fixture data you want to compute. |
| `callback` | `function` | Callback function that allows you to work with the Faker rendered data. |


### Returns

`Any`: Returns whatever you determine in the `callback` function.


### Example

The `faker.computed()` method accepts a single argument (`object`), that contains a shape of the data you'd like to work with. In the example below, we're only using `name`. You can add as many as you want (and nest as deeply as you want).

```js
import { createSpec, faker } from '@helpscout/helix'

const props = {
  name: faker.name.firstName()
}
```

After you pass the `props` into `faker.computed()`, instantiate a curried function with an argument of `values` (or whatever you'd like to name it).
The `values` argument is your `props` object remapped with Faker generated content!

```js
faker.computed(props)(values => {
// values is…
// {
//   name: 'Abigail'
// }
})
```

The last step is to return **whatever content you want** for your computed value. In this example, we'll take our Faker generated firstName, make it all uppercase, and add a space between every letter.

```js
faker.computed(props)(values => {
  return values.name.toUpperCase().split('').join(' ')
})
```

The complete example looks something like this:

```js
const Dinosaur = createSpec({
  id: faker.random.number(),
  fullName: faker.computed(props)(values => {
    return values.name.toUpperCase().split('').join(' ')
  })
})

Dinosaur.generate()
// {
//   id: 324191,
//   fullName: 'A B I G A I L'
// }
```
