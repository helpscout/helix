# `compose(...specs)`

Compose is a function that allows you to easily combine multiple [HelixSpec](./HelixSpec) Specs and/or regular `objects` to create a brand new HelixSpec.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `specs` | `HelixSpec` or `object` | HelixSpec classes and/or objects to combine together. |


### Returns

`HelixSpec`: Renders a single [HelixSpec](./HelixSpec) class.


### Example

```js
import { compose, createSpec, faker } from '@helpscout/helix'

const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})

const MrDNA = createSpec({
  name: 'Mr. DNA',
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  jobTitle: 'Guide'
})

const User = createSpec({
  uuid: faker.random.uuid(),
  description: faker.lorem.sentence()
})

const MrDinosaurUser = compose(
  Dinosaur,
  MrDNA,
  User
)

MrDinosaurUser.generate()
// { 
//   id: 18482,
//   name: 'Mr. DNA',
//   location: 'Malawi',
//   avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/robinclediere/128.jpg',
//   email: 'Stephanie36@hotmail.com',
//   jobTitle: 'Guide',
//   uuid: 'd1b4d842-b970-466e-86d9-d7d1b9b32782',
//   description: 'Natus in delectus animi ex sed voluptatum molestias quae.'
// }
```
