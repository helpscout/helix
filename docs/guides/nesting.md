# Nesting

Helix supports nesting, which allows you to **re-use** existing Specs (because typing the same things over and over get's tiring, and is boring).

For this guide, let's create a Pterodactyl!

Below, we have our Wing spec:

```js
const Wing = createSpec({
  id: faker.datatype.uuid(),
  color: faker.commerce.color(),
  size: faker.datatype.number(),
});
```

A Pterodactyl has wings (plus other things). Instead of manually copy/pasting the shape of the Wing spec, let's just nest it!

```js
const Wing = createSpec({
  id: faker.datatype.uuid(),
  color: faker.commerce.color(),
  size: faker.datatype.number(),
});

const Pterodactyl = createSpec({
  id: faker.datatype.uuid(),
  color: faker.commerce.color(),
  location: faker.address.country(),
  wing: Wing,
});
```

To create a Pterodactyl, we'll just [`.generate()`](../api/HelixSpec/generate.md) as we normally would. Helix will automatically `.generate()` the nested Wing spec.

```js
Pterodactyl.generate();
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

### Using imported Specs

An external Spec file can be imported in and nested.

`Wing.js`

```js
const Wing = createSpec({
  id: faker.datatype.uuid(),
  color: faker.commerce.color(),
  size: faker.datatype.number(),
});

export default Wing;
```

`Pterodactyl.js`

```js
import Wing from "./Wing";

const Pterodactyl = createSpec({
  id: faker.datatype.uuid(),
  color: faker.commerce.color(),
  location: faker.address.country(),
  wing: Wing,
});
```

### Generating multiple nested Specs

To create an array of nested Specs, pass in the `number` if fixtures you'd like to generate. Check out [our multi-Spec generating guide](./multi-generate.md) for more details.

```js
const LaserGun = createSpec({
  id: faker.datatype.uuid(),
  power: faker.datatype.number(),
});

const MechaPterodactyl = createSpec({
  id: faker.datatype.uuid(),
  color: faker.commerce.color(),
  location: faker.address.country(),
  weapons: LaserGun.generate(5),
});
```

## Up next

Learn how to **[compose multiple specs](./composing.md)** together!
