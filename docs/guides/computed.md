# Computed

Being able to create computed values adds **extra** flexibility to generating your fixtures. With Helix, there are two ways you can do this:

* "Easy-mode": Straight forward. Works. Less code. Less flexibility.
* "Hard-mode": Slightly more code. Ultimate flexibility!


## Easy-mode

You can do this by using the `fake()` method that comes with [Faker.js](https://github.com/marak/Faker.js/#fakerfake). Note, you'd still need to use `faker` supplied by Helix for consistent results.

Simply pass a string into `faker.fake()`, and add the faker methods with `{{curly braces}}`.
Just a heads up, don't add `faker.` in front of the computed methods, and don't instantiate them.

```js
import { createSpec, faker } from '@helpscout/helix'

const Dinosaur = createSpec({
  id: faker.random.number(),
  fullName: faker.fake('{{name.firstName}} {{name.lastName}}')
})

Dinosaur.generate()
// {
//   id: 324191,
//   fullName: 'Sauna Marks'
// }
```

If you want something that's more flexible with **ultimate control**, check out [hard-mode](#hard-mode).


## Hard-mode

To have more control over your computed values, you can use the `faker.computed()` method. `computed()` is a special method Helix has extended onto Faker.js, and isn't available in the default Faker.js library.

The `faker.computed()` method accepts a single argument (`object`), that contains a shape of the data you'd like to work with. In the example below, we're only using `name`. You can add as many as you want (and nest as deeply as you want).

```js
import { createSpec, faker } from '@helpscout/helix'

const props = {
  name: faker.name.firstName()
}
```

After you pass the `props` into `faker.computed()`, instantiate a curried function with an argument of `values` (or whatever you'd like to name it).
The `values` argument is your `props` object remapped with Faker generated content!

```js
faker.computed(props)(values => {
// values is…
// {
//   name: 'Abigail'
// }
})
```

The last step is to return **whatever content you want** for your computed value. In this example, we'll take our Faker generated firstName, make it all uppercase, and add a space between every letter.

```js
faker.computed(props)(values => {
  return values.name.toUpperCase().split('').join(' ')
})
```

The complete example looks something like this:

```js
const Dinosaur = createSpec({
  id: faker.random.number(),
  fullName: faker.computed(props)(values => {
    return values.name.toUpperCase().split('').join(' ')
  })
})

Dinosaur.generate()
// {
//   id: 324191,
//   fullName: 'A B I G A I L'
// }
```

If you want something that's less verbose that just works, check out [easy-mode](#easy-mode).


## That's it!

👏 Thanks for making it to the end of the guide! Good luck and have fun generating fixtures for your project!
