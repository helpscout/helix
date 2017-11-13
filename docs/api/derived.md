# `derived(mapper({...props} => callback))`

To have more control over your computed values, you can use the `derived` function. It provides access to existing [HelixSpec](./HelixSpec)'s Spec shape properties to create new computed outputs.

**Note: `derived()` was created as a replacement for [`faker.computed`](./faker/computed.md).**

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `mapper` | `function` | Function for `derived` to instantiate. |
| `{...props}` | `object` | Argument provided by `mapper`, containing existing props within the Spec shape. |
| `callback` | `function` | Callback function that allows you to work with the Faker rendered data. |


### Returns

`Any`: Returns whatever you determine in the `callback` function.


### Example

```js
import { createSpec, derived, faker } from '@helpscout/helix'

const Spec = createSpec({
  fname: faker.name.firstName(), // Alice
  lname: faker.name.lastName(), // Baker
  name: derived(({ fname, lname }) => `${fname} ${lname}`)
})

const fixture = Spec.generate() // Alice Baker
```
