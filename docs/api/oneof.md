# `oneof(...specs)`

`oneof` is a function that allows you to define a HelixSpec which returns one of a number of different specs at random.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `specs` | `HelixSpec` or `object` | HelixSpec classes and/or objects to combine together. |


### Returns

`HelixSpec`: Renders a single [HelixSpec](./HelixSpec) class.


### Example

```js
import { oneof, createSpec, faker } from '@helpscout/helix'

const Tyrannosaurus = createSpec({
  id: faker.random.number(),
  type: 'meateater',
  name: faker.name.firstName(),
  location: faker.address.country()
})

const Stegosaurus = createSpec({
  id: faker.random.number(),
  type: 'planteater',
  name: faker.name.firstName(),
  location: faker.address.country()
})

const Dinosaur = oneof(Tyrannosaurus, Stegosaurus)

Dinosaur.generate()
// Instance of either stegasaurus or tyrannosaurus
```
