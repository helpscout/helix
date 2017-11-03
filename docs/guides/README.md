# Introduction

You're excited and ready to start creating fixture data for your project. Awesome 🙌 (us too!). Before you start, you'll need to get setup.


## Install

To get started, install Helix by entering the `npm` install command above (or use `yarn add`).

```
npm install @helpscout/helix --save-dev
```


## Setup

Now that you have Helix installed in your project, you'll need to import both `createSpec` and `faker` from Helix.

```js
import { createSpec, faker } from '@helpscout/helix'
```

Note: If you're using `require`, you can do:

```js
const helix = require('@helpscout/helix')
const createSpec = helix.createSpec
const faker = helix.faker
```


## Up Next

Learn how to **[create your first Helix spec](./create-spec.md)**!
