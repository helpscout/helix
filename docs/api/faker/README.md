# Faker

The `faker` object in Helix is a very light-weight wrapper for [Faker.js](https://github.com/marak/Faker.js/)


### Usage

```js
import { createSpec, faker } from '@helpscout/helix'

const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})
```


### Methods

For a **full list** of all the available Faker methods, **[check out their documentation](https://github.com/marak/Faker.js/#api-methods)**.

Helix has enhanced Faker with a couple of methods:

* [fake](./fake.md)
