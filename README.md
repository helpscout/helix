# Helix 💠 [![Build Status](https://travis-ci.org/helpscout/helix.svg?branch=master)](https://travis-ci.org/helpscout/helix) [![Coverage Status](https://coveralls.io/repos/github/helpscout/helix/badge.svg?branch=master)](https://coveralls.io/github/helpscout/helix?branch=master) [![npm version](https://badge.fury.io/js/%40helpscout%2Fhelix.svg)](https://badge.fury.io/js/%40helpscout%2Fhelix)

A [Faker](https://github.com/marak/Faker.js/)-powered fixture generator for Javascript.

Helix allows you to quickly (and reliably) generate fixture data to be hydrated into Javascript components/views (like React, Vue, Backbone, etc…).


## Install

```
npm install @helpscout/helix --save-dev
```


## Documentation

Check out **[our documentation](./docs)** for more info!


## Basic usage

The `createSpec` function is used to define your fixture spec. Helix comes with an adjusted version of [Faker.js](https://github.com/marak/Faker.js/), which also needs to be imported. Note, the API for Helix's faker is the **exact** same as Faker.js.

```js
import { createSpec, faker } from '@helpscout/helix'

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
