# Helix

## Getting started

To get started, install Helix by entering the `npm` install command above (or use `yarn add`).

Next, import both `createSpec` and `faker` from Helix to the file in your project.

```js
import { createSpec, faker } from '@helpscout/helix'
```


## Example

The `createSpec` function is used to define your fixture spec. Helix comes with an adjusted version of [Faker.js](https://github.com/marak/Faker.js/), which also needs to be imported. Note, the API for Helix's faker is the **exact** same as Faker.js.

```js
const CustomerSpec = createSpec({
  id: faker.random.number()
  fname: faker.name.firstName()
  lname: faker.name.lastName()
  company: faker.company.companyName()
})

const fixture = CustomerSpec.generate()

// Output
// {
//   id: 12339041,
//   fname: 'Alice',
//   lname: 'Konigsberg',
//   company: 'Smiths Co.'
// }
```

For a full list of Faker methods, check out [their documentation](https://github.com/marak/Faker.js/#api-methods).


### Seeding

Seeding allows you to consistently generate the same data based on a specific seed number.

To seed your Spec, use the `.seed()` method just before `.generate()`.

```js
const CustomerSpec = createSpec({
  id: faker.random.number()
  fname: faker.name.firstName()
  lname: faker.name.firstName()
  company: faker.company.companyName()
})

// Seeding with "12"
const fixture = CustomerSpec.seed(12).generate()
```


### Multi-generation

You can generate multiple instances of your Spec fixture using the `generate()` method. All you have to do is pass in the number of instances you want generated!

```js
const Text = createSpec({
  id: faker.random.number(),
  message: faker.lorem.paragraph()
})

const fixture = Text.generate(5)

// Output
// [{}, {}, {}, {}, {}]
```

#### Seeding

To seed multi-generated fixtures, simply use the `.seed()` method before generating.

```js
const Text = createSpec({
  id: faker.random.number(),
  message: faker.lorem.paragraph()
})

const fixture = Text.seed(50).generate(5)
```

Note: Seed values aren't passed down from the parent Spec to children multi-specs.



### Nesting

Specs can be nested! In the example below, you can see that we've created 2 Specs: `MessageSpec` and `ConvoSpec`. Our `ConvoSpec` contains `MessageSpec` inside.

```js
const MessageSpec = createSpec({
  id: faker.random.number(),
  read: faker.random.boolean(),
  message: faker.lorem.paragraph()
})

const ConvoSpec = createSpec({
  id: faker.random.number(),
  messages: MessageSpec.generate(5)
})

const fixture = ConvoSpec.generate()

// Output
// {
//   id: 12341,
//   messages: [{}, {}, {}, {}, {}]
// }
```


## TODO

* [ ] Write better docs
