import HelixSpec from '..'
import faker from '../../faker'
import ExternalTestSpec from './ExternalTestSpec'

describe('generate', () => {
  test('Throw if argument is invalid', () => {
    const person = new HelixSpec({
      id: faker.random.number()
    })
    expect(() => { person.generate(true) }).toThrow()
    expect(() => { person.generate('name') }).toThrow()
    expect(() => { person.generate(false) }).toThrow()
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
})

describe('extend', () => {
  test('Can extend base specs', () => {
    const person = new HelixSpec({
      id: faker.random.number(),
      fname: 'Ava'
    })
    person.extend({
      fname: faker.name.firstName(),
      lname: 'Smith'
    })
    const fixture = person.generate()

    expect(typeof fixture.id).toBe('number')
    expect(fixture.fname).not.toBe('Ava')
    expect(typeof fixture.fname).toBe('string')
    expect(fixture.lname).toBe('Smith')
  })

  test('Can extend base specs, multiple times', () => {
    const person = new HelixSpec({
      id: faker.random.number(),
      fname: 'Ava'
    })
    person.extend({
      fname: faker.name.firstName(),
      lname: 'Smith'
    }, {
      count: faker.random.number()
    }, {
      active: true
    })
    const fixture = person.generate()

    expect(typeof fixture.id).toBe('number')
    expect(fixture.fname).not.toBe('Ava')
    expect(typeof fixture.fname).toBe('string')
    expect(fixture.lname).toBe('Smith')
    expect(typeof fixture.count).toBe('number')
    expect(fixture.active).toBe(true)
  })
})

describe('seed', () => {
  test('Can be set', () => {
    const person = new HelixSpec({
      name: faker.name.firstName()
    })

    const one = person.seed(1).generate()
    const two = person.seed(200).generate()
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

    faker.seed(99999999999)
    const one = person.seed(1).generate()
    faker.seed(888888)
    const two = person.seed(200).generate()
    faker.seed(6666)
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

    const fixture = MessageSpec.seed(4).generate(5)

    expect(Array.isArray(fixture)).toBeTruthy()
    expect(fixture[0].id).toBe(fixture[1].id)
  })
})

describe('External', () => {
  test('Can load external test spec', () => {
    const fixture = ExternalTestSpec.generate()

    expect(typeof fixture.id).toBe('number')
    expect(typeof fixture.fname).toBe('string')
    expect(typeof fixture.lname).toBe('string')
  })

  test('Can nest external spec', () => {
    const NestedSpec = new HelixSpec({
      external: ExternalTestSpec
    })

    const fixture = NestedSpec.generate().external

    expect(typeof fixture.id).toBe('number')
    expect(typeof fixture.fname).toBe('string')
    expect(typeof fixture.lname).toBe('string')
  })
})
