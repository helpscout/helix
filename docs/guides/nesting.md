# Nesting

Helix supports nesting, which allows you to **re-use** existing Specs (because typing the same things over and over get's tiring, and is boring).

For this guide, let's create a Pterodactyl!

Below, we have our Wing spec:

```js
const Wing = createSpec({
  id: faker.random.uuid(),
  color: faker.commerce.color(),
  size: faker.random.number()
})
```

A Pterodactyl has wings (plus other things). Instead of manually copy/pasting the shape of the Wing spec, let's just nest it!

```js
const Wing = createSpec({
  id: faker.random.uuid(),
  color: faker.commerce.color(),
  size: faker.random.number()
})

const Pterodactyl = createSpec({
  id: faker.random.uuid(),
  color: faker.commerce.color(),
  location: faker.address.country(),
  wing: Wing
})
```

To create a Pterodactyl, we'll just [`.generate()`](../api/HelixSpec/generate.md) as we normally would. Helix will automatically `.generate()` the nested Wing spec.

```js
Pterodactyl.generate()
// {
//   id: '655ce455-b465-4cee-b65e-abbd57f271eb',
//   color: 'silver',
//   location: 'Hong Kong',
//   wing: {
//     id: '3f346956-4422-467a-b5c4-d96d96bd7aaf',
//     color: 'black',
//     size: 86910
//   }
// }
```


## Up next

Learn how to **[compose multiple specs](./composing.md)** together!
