# Seed

Seeding is a technique in [Faker](https://github.com/marak/Faker.js/#setting-a-randomness-seed) that allows you to get consistent results from your fixtures.


## Seeding from Specs

Let's use the `Dinosaur` spec we created in the [previous guide](./create-spec.md).

```js
const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})
```

To seed your fixture, use the `.seed()` method **before** you use `.generate()`. These methods can even be chained together!

```js
Dinosaur.seed(3).generate()
// { id: 55079, name: 'Antone', location: 'Pitcairn Islands' }
```

Seeding your spec will **always** result in the same fixture output. Just a heads up, the seed value is reset every time a Spec is generated.

```js
Dinosaur.seed(3).generate()
// { id: 55079, name: 'Antone', location: 'Pitcairn Islands' }
Dinosaur.seed(3).generate()
// { id: 55079, name: 'Antone', location: 'Pitcairn Islands' }

// No more seeding!
Dinosaur.generate()
{ id: 83994, name: 'Eileen', location: 'Brazil' }
```

Congrats! You've successfully generate Spec fixtures with **consistent** results.


## Up next

Learn how to easy **["generate multiple"](./multi-generate.md)** fixtures!
