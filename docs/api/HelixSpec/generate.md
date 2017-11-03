# `generate(count, maxCount)`

Returns an object in the shape of the HelixSpec, rendered with the appropriate [Faker](https://github.com/marak/Faker.js/) fields.


### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `count` | `number` | Generates `n` number of fixture objects. Returns an `array`. |
| `maxCount` | `number` | Generates a random amount between `count` and `maxCount` of fixture objects. Returns an `array`. |


### Returns

`object` | `array`: Rendered fixture object. Returns an array of rendered fixture objects if `count` is used.


### Example

```js
const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})

Dinosaur.generate()
// {
//   id: 1231,
//   name: 'Alice',
//   location: 'Canada'
// }
```


#### Generating multiple fixtures

You can generate an array of fixtures by passing in a `number` for the `count` argument.

**Example**

```js
Dinosaur.generate(2)
//   [
//     { id: 55079, name: 'Antone', location: 'Pitcairn Islands' },
//     { id: 83994, name: 'Eileen', location: 'Brazil' }
//   ]
```


#### Generating a random amount of fixtures

You can generate an array containing a random amount of fixtures between two `numbers` by passing in the `count` and `maxCount` arguments.

**Example**

```js
Dinosaur.generate(1, 5)
//   [
//     { id: 76619, name: 'Tess', location: 'Jordan' },
//     { id: 60633, name: 'Madeline', location: 'Uzbekistan' },
//     { id: 5002, name: 'Crawford', location: 'Armenia' }
//   ]
```
