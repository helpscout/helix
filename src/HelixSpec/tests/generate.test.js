import HelixSpec from '..'
import faker from '../../faker'

test('Throw if argument is invalid', () => {
  const person = new HelixSpec({
    id: faker.random.number()
  })
  expect(() => { person.generate(true) }).toThrow()
  expect(() => { person.generate('name') }).toThrow()
  expect(() => { person.generate(false) }).toThrow()
})

test('Throw if max argument is invalid', () => {
  const person = new HelixSpec({
    id: faker.random.number()
  })
  expect(() => { person.generate(1, true) }).toThrow()
  expect(() => { person.generate(1, 'name') }).toThrow()
  expect(() => { person.generate(1, false) }).toThrow()
})

test('Can create a spec from a single function', () => {
  const randomNumber = new HelixSpec(faker.random.number({ min: 100, max: 103 }))
  const generate = randomNumber.generate()
  expect(typeof generate).toBe('number')
  expect(generate).toBeGreaterThanOrEqual(100)
  expect(generate).toBeLessThanOrEqual(103)
})

test('Can use single-value spec inside another Spec', () => {
  const UserType = new HelixSpec(faker.random.arrayElement(['user', 'guest', 'admin']))
  const User = new HelixSpec({
    id: faker.random.number(),
    name: faker.name.firstName(),
    location: faker.address.country(),
    type: UserType
  })
  const user = User.generate()
  expect(user.type).toMatch(/(user)|(guest)|(admin)/)
})

test('Throw if max argument is less than count argument', () => {
  const person = new HelixSpec({
    id: faker.random.number()
  })
  expect(() => { person.generate(10, 10) }).toThrow()
  expect(() => { person.generate(10, 1) }).toThrow()
})

test('Generates fixtures from a spec object', () => {
  const person = new HelixSpec({
    id: faker.random.number()
  })
  const fixture = person.generate()

  expect(fixture.id).toBeTruthy()
})

test('Can generate multiple specs', () => {
  const MessageSpec = new HelixSpec({
    id: faker.random.number(),
    read: faker.random.boolean(),
    timestamp: faker.date.past(),
    message: faker.lorem.paragraph()
  })

  const fixture = MessageSpec.generate(5)

  expect(Array.isArray(fixture)).toBeTruthy()
  expect(fixture[0].id).not.toBe(fixture[1].id)
})

test('Can generate nested un-generated spec', () => {
  const PersonSpec = new HelixSpec({
    id: faker.random.number(),
    fname: faker.name.firstName(),
    lname: faker.name.lastName()
  })

  const NestedSpec = new HelixSpec({
    external: PersonSpec
  })

  const fixture = NestedSpec.generate().external

  expect(typeof fixture.id).toBe('number')
  expect(typeof fixture.fname).toBe('string')
  expect(typeof fixture.lname).toBe('string')
})
