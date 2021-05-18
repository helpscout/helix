# Generating multiple fixtures

In a [previous guide](./create-spec.md) we learned how to create a Spec and generate a fixture. In this guide, we'll learn how we can easily generate many fixtures!

In the example below, `myDanosawur` is a single object containing our fixture data.

```js
const Dinosaur = createSpec({
  id: faker.datatype.number(),
  name: faker.name.firstName(),
  location: faker.address.country(),
});

const myDanosawur = Dinosaur.generate();
// {
//   id: 1231,
//   name: 'Alice',
//   location: 'Canada'
// }
```

To generate multiple fixtures, simply pass the `number` you want generated into the `.generate()` method.

```js
const Dinosaur = createSpec({
  id: faker.datatype.number(),
  name: faker.name.firstName(),
  location: faker.address.country(),
});

const myDanosawurs = Dinosaur.generate(2);
// [
//   { id: 55079, name: 'Antone', location: 'Pitcairn Islands' },
//   { id: 83994, name: 'Eileen', location: 'Brazil' }
// ]
```

Bam! Multiple Danosawurs! If a `number` is passed into `.generate()`, it will return an array of fixtures instead of a single fixture object.

## Generating a random amount of fixtures

You can also generate an array containing a **random** amount of fixtures between two `numbers` by passing in two arguments to `.generate()`: `count` and `maxCount`.

In the example below, we're going to be generating anywhere between `1` to `5` Danosawurs.

```js
Dinosaur.generate(1, 5);
// [
//   { id: 76619, name: 'Tess', location: 'Jordan' },
//   { id: 60633, name: 'Madeline', location: 'Uzbekistan' },
//   { id: 5002, name: 'Crawford', location: 'Armenia' }
// ]
```

## Up next

Learn how to Specs within Specs by **[nesting](./nesting.md)**.
