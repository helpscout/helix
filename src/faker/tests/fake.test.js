import faker from '../'

test('Can interpolate methods', () => {
  const name = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')
  const o = name.split(' ')

  expect(typeof name).toBe('string')
  expect(name.indexOf('{') < 0).toBeTruthy()
  expect(name.indexOf('}') < 0).toBeTruthy()
  expect(o.length).toBe(3)
})

test('Can interpolate methods with seed', () => {
  faker.seed(1)
  const one = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')
  faker.seed(1)
  const two = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')
  faker.seed(2)
  const three = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')

  expect(one).toBe(two)
  expect(two).not.toBe(three)
})
