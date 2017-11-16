# HelixSpec

HelixSpec is the class that gets returned by the `createSpec()` function.


### Usage

```js
const Dinosaur = createSpec({
  id: faker.random.number(),
  name: faker.name.firstName(),
  location: faker.address.country()
})
// Returns a HelixSpec
```


### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `shape` | `object` | Object containing key/value pairs to construct the fixture data. |



### Methods

HelixSpec contains a handful of methods:

* [extend](./extend.md)
* [beforeGenerate](./beforeGenerate.md)
* [generate](./generate.md)
* [afterGenerate](./beforeGenerate.md)
* [seed](./seed.md)
