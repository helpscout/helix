import HelixSpec from '..'
import faker from '../../faker'

test('Throws if argument is invalid', () => {
  const person = new HelixSpec({
    name: faker.name.firstName()
  })

  expect(() => { person.seed() }).not.toThrow()
  expect(() => { person.seed('1') }).toThrow()
  expect(() => { person.seed(true) }).toThrow()
  expect(() => { person.seed({value: 2}) }).toThrow()
})

test('Can be set', () => {
  const person = new HelixSpec({
    name: faker.name.firstName()
  })

  const one = person.seed(1).generate()
  const two = person.seed(2).generate()
  const three = person.seed(1).generate()

  expect(typeof one.name).toBe('string')
  expect(typeof two.name).toBe('string')
  expect(typeof three.name).toBe('string')
  expect(one.name).not.toBe(two.name)
  expect(two.name).not.toBe(three.name)
  expect(one.name).toBe(three.name)
})

test('Is unaffected by external faker.seed', () => {
  const person = new HelixSpec({
    name: faker.name.firstName()
  })

  faker.seed(4)
  const one = person.seed(1).generate()
  const two = person.seed(2).generate()
  faker.seed(3)
  const three = person.seed(1).generate()

  expect(typeof one.name).toBe('string')
  expect(typeof two.name).toBe('string')
  expect(typeof three.name).toBe('string')
  expect(one.name).not.toBe(two.name)
  expect(two.name).not.toBe(three.name)
  expect(one.name).toBe(three.name)
})

test('Can generate multiple specs, but with the same seed', () => {
  const MessageSpec = new HelixSpec({
    id: faker.random.number(),
    read: faker.random.boolean(),
    timestamp: faker.date.past(),
    message: faker.lorem.paragraph()
  })

  const fixture = MessageSpec.seed(2).generate(5)

  expect(Array.isArray(fixture)).toBeTruthy()
  expect(fixture[0].id).toBe(fixture[1].id)
})
