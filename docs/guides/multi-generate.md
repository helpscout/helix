# Generating multiple fixtures

Coming soon!

## Generating multiple fixtures

You can generate an array of fixtures by passing in a `number` for the `count` argument.

**Example**

```js
Dinosaur.generate(2)
//   [
//     { id: 55079, name: 'Antone', location: 'Pitcairn Islands' },
//     { id: 83994, name: 'Eileen', location: 'Brazil' }
//   ]
```


## Generating a random amount of fixtures

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
