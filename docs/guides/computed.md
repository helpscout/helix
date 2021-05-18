# Computed

Being able to create computed values adds **extra** flexibility to generating your fixtures. With Helix, there are two ways you can do this:

- "**[Easy-mode](#easy-mode)**": Straight forward. Works. Less code. Less flexibility.
- "**[Hard-mode](#hard-mode)**": Slightly more code. Ultimate flexibility!

## Easy-mode

You can do this by using the `fake()` method that comes with [Faker.js](https://github.com/marak/Faker.js/#fakerfake). Note, you'd still need to use `faker` supplied by Helix for consistent results.

Simply pass a string into `faker.fake()`, and add the faker methods with `{{curly braces}}`.
Just a heads up, don't add `faker.` in front of the computed methods, and don't instantiate them.

```js
import { createSpec, faker } from "@helpscout/helix";

const Dinosaur = createSpec({
  id: faker.datatype.number(),
  fullName: faker.fake("{{name.firstName}} {{name.lastName}}"),
});

Dinosaur.generate();
// {
//   id: 324191,
//   fullName: 'Sauna Marks'
// }
```

If you want something that's more flexible with **ultimate control**, check out [hard-mode](#hard-mode).

## Hard-mode

To have more control over your computed values, you can use the `derived()` function.

In the example below, we're only using `name`. You can add as many as you want (and nest as deeply as you want).

```js
import { createSpec, derived, faker } from '@helpscout/helix'

const props = {
  name: faker.name.firstName()
}

const Dinosaur = createSpec({
  id: faker.datatype.number(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  fancyName: derived((props => {
    const { firstName } = props
    return firstName.toUpperCase().split('').join(' ')
  })
})

Dinosaur.generate()
// {
//   id: 324191,
//   firstName: 'Abigail',
//   lastName: 'Baker',
//   fancyName: 'A B I G A I L'
// }
```

If you want something that's less verbose that just works, check out [easy-mode](#easy-mode).

## That's it!

👏 Thanks for making it to the end of the guide! Good luck and have fun generating fixtures for your project!
