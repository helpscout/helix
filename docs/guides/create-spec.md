# Creating a Spec

Let's get started in creating a [Helix spec](../api/HelixSpec)!

Using the `createSpec` function, we'll pass in the shape of our spec with the appropriate [Faker methods](https://github.com/marak/Faker.js/#api-methods).

Note: Helix slightly enhances Faker, but the methods remain the same! Check out **[Faker's API methods](https://github.com/marak/Faker.js/#api-methods)** for a complete list.

## Creating a Spec

Let's create a `Dinosaur` 🦎

```js
const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})
```

Perfect! Just like that, we've defined our `Dinosaur` (Dino DNA!). However, if you `console.log` it, you'll noticed that it doesn't actually have any fixture data (yet).

```js
console.log(Dinosaur)
// { id: [Function], name: [Function], location: [Function]
```

The default Faker methods would have rendered some nice fixture data for you the moment you instantiate the methods. However, Helix's `faker` does not!

The actually render the fixture data, we'll need to generate it.


## Generating fixture data

To generate the fixture data, use the `.generate()` method on your Spec. This returns a regular object in the shape of your Spec.

```js
Dinosaur.generate()
// {
//   id: 1231,
//   name: 'Alice',
//   location: 'Canada'
// }
```

Because of how Faker works, you'll get a different result every time you `generate()`

```js
Dinosaur.generate()
// {
//   id: 1231,
//   name: 'Alice',
//   location: 'Canada'
// }

Dinosaur.generate()
// {
//   id: 5573213,
//   name: 'Tim',
//   location: 'Japan'
// }
```

To keep your fixture, you can cache it as a regular JS variable:

```js
const myDanosawur = Dinosaur.generate()
// {
//   id: 1231,
//   name: 'Alice',
//   location: 'Canada'
// }

// myDanosawr.name will always be Alice!
```

And that's it! You've generated some fixture data for your Dinosaur. 


## Up next

Learn how to generate consistent fixture results by **[seeding](./seeding.md)**.
