# `oneOf(specs)`

`oneOf` is a function that allows you to define a HelixSpec which returns one of a number of different specs at random.

### Arguments

| Argument | Type                               | Description                                                        |
| -------- | ---------------------------------- | ------------------------------------------------------------------ |
| `specs`  | array of `HelixSpec`s or `object`s | Array of `HelixSpec` classes and/or objects shapes to choose from. |

### Returns

`HelixSpec`: Renders a single [HelixSpec](./HelixSpec) class.

### Example

```js
import { oneOf, createSpec, faker } from "@helpscout/helix";

const Tyrannosaurus = createSpec({
  id: faker.datatype.number(),
  type: "meateater",
  name: faker.name.firstName(),
});

const Stegosaurus = createSpec({
  id: faker.datatype.number(),
  type: "planteater",
  name: faker.name.firstName(),
});

const Dinosaur = oneOf([Tyrannosaurus, Stegosaurus]);

Dinosaur.generate();
// Instance of either stegasaurus or tyrannosaurus
```
