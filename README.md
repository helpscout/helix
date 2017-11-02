# Helix 🔸 [![Build Status](https://travis-ci.org/helpscout/helix.svg?branch=master)](https://travis-ci.org/helpscout/helix)

A [Faker](https://github.com/marak/Faker.js/)-powered fixture generator for Javascript.

Helix allows you to quickly (and reliably) generate fixture data to be hydrated into Javascript components/views (like React, Vue, Backbone, etc…).


## Install

```
npm install @helpscout/helix --save-dev
```


## Quick Example

The `createSpec` function is used to define your fixture spec. Helix comes with an adjusted version of [Faker.js](https://github.com/marak/Faker.js/), which also needs to be imported. Note, the API for Helix's faker is the **exact** same as Faker.js.

```js
import { createSpec, faker } from '@helpscout/helix'

const CustomerSpec = createSpec({
  id: faker.random.number()
  fname: faker.name.firstName()
  lname: faker.name.firstName()
  company: faker.company.companyName()
})

const fixture = CustomerSpec.generate()

// Output
{
  id: 12339041,
  fname: 'Alice',
  lname: 'Konigsberg',
  company: 'Smiths Co.'
}
```

For a full list of Faker methods, check out [their documentation](https://github.com/marak/Faker.js/).


### Seeding

Seeding allows you to consistently generate the same data based on a specific seed number.

To seed your Spec, use the `.seed()` method just before `.generate()`.

```js
import { createSpec, faker } from '@helpscout/helix'

const CustomerSpec = createSpec({
  id: faker.random.number()
  fname: faker.name.firstName()
  lname: faker.name.firstName()
  company: faker.company.companyName()
})

// Seeding with "12"
const fixture = CustomerSpec.seed(12).generate()
```
