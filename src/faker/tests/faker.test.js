import faker from '../'

test('Methods should return functions', () => {
  const o = faker.random.number()
  const results = o()

  expect(typeof o).toBe('function')
  expect(typeof results).toBe('number')
})

test('Seed method should work', () => {
  faker.seed(1)
  const one = faker.random.number()()
  faker.seed(2)
  const two = faker.random.number()()
  faker.seed(1)
  const three = faker.random.number()()

  expect(one).not.toBe(two)
  expect(two).not.toBe(three)
  expect(one).toBe(one)
})
