# Composing

Composing is a technique that uses the [`compose`](../api/compose.md) function to easily combine multiple [HelixSpec](./HelixSpec) Specs and/or regular `objects` to create a brand new HelixSpec.

In addition to `createSpec` and `faker`, be sure to `import` `compose` as well.


## Composing Specs

```js
import { createSpec, compose, faker } from '@helpscout/helix'
```

For this guide, let's try to create a Spec for a MutantMechaDinosaur by composing 3 Specs together (`Mutant`, `Mecha`, and `Dinosaur`).

First, let's define our three individual Specs:

```js
import { createSpec, compose, faker } from '@helpscout/helix'

const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})

const Mutant = createSpec({
  id: faker.random.number(),
  mutation: faker.random.uuid()
})

const Mecha = createSpec({
  id: faker.random.number(),
  material: faker.commerce.productMaterial(),
  weapon: {
    power: faker.random.number()
  }
})
```

Next, let us **compose**! To do this, simply pass in all of our desired specs as arguments into the `compose` function.

```js
const MutantMechaDinosaur = compose(
  Dinosaur,
  Mutant,
  Mecha
)
```

The `compose` function squashes and combines any applicable Spec into a single brand new Spec. Fields with the same name (in our case, `id`), will be overridden. This ensures that we don't have 3 `id` fields.

And there we have it! Our super awesome `MutantMechaDinosaur`! Since `compose` returns a regular HelixSpec, we can `.generate()` fixtures as we usually would.

```js
MutantMechaDinosaur.generate()
// {
//   id: 62037,
//   name: 'Gabe',
//   location: 'Cocos (Keeling) Islands',
//   mutation: '26f39ed3-6759-45cb-95a5-0a9000d12d69',
//   material: 'Plastic',
//   weapon: { power: 93597 }
// }
```


## Composing objects

In addition to combining Specs, `compose` can also accept regular ol' Javascript objects.

```js
import { createSpec, compose, faker } from '@helpscout/helix'

const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})

const Mutant = createSpec({
  id: faker.random.number(),
  mutation: faker.random.uuid()
})

const Mecha = {
  id: faker.random.number(),
  shiny: 'Definitely.'
  weapon: {
    power: 'Over 7000!'
  }
}

const MutantMechaDinosaur = compose(
  Dinosaur,
  Mutant,
  Mecha
)

MutantMechaDinosaur.generate()
// {
//   id: 62037,
//   name: 'Gabe',
//   location: 'Cocos (Keeling) Islands',
//   mutation: '26f39ed3-6759-45cb-95a5-0a9000d12d69',
//   shiny: 'Definitely.',
//   weapon: { power: 'Over 7000!' }
// }
```

## Variable type Specs

Sometimes, a spec needs a value which can be one of several different types. This can easily be accomplished with the `oneOf` helper

```js
import { oneOf, createSpec, faker } from '@helpscout/helix'

const Tyrannosaurus = createSpec({
  id: faker.random.number(),
  type: 'meateater',
  name: faker.name.firstName()
})

const Stegosaurus = createSpec({
  id: faker.random.number(),
  type: 'planteater',
  name: faker.name.firstName()
})

const Dinosaur = oneof(Tyrannosaurus, Stegosaurus)

Dinosaur.generate()
// Instance of either stegasaurus or tyrannosaurus
```


## Up next

Learn how to generate **[computed values](./computed.md)**.
