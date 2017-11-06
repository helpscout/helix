import { times } from 'lodash'
import HelixSpec from '..'
import faker from '../../faker'
import ExternalTestSpec from './ExternalTestSpec.fixture'

describe('generate', () => {
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

  test('Can generate computed values', () => {
    const nameProps = {
      fname: faker.name.firstName(),
      lname: faker.name.lastName()
    }
    const PersonSpec = new HelixSpec({
      id: faker.random.number(),
      name: faker.computed(nameProps)(props => {
        return `${props.fname} ${props.lname}`
      })
    })

    const fixture = PersonSpec.generate()

    expect(typeof fixture.name).toBe('string')
    expect(fixture.name.split(' ').length).toBe(2)
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

  test('Can generate min -> max specs with the same seed', () => {
    const MessageSpec = new HelixSpec({
      id: faker.random.number(),
      read: faker.random.boolean(),
      timestamp: faker.date.past(),
      message: faker.lorem.paragraph()
    })

    times(10, (index) => {
      const fixture = MessageSpec.seed(index).generate(1, 5)
      expect(Array.isArray(fixture)).toBeTruthy()
      expect(fixture.length).toBeGreaterThanOrEqual(1)
      expect(fixture.length).toBeLessThanOrEqual(5)
    })
  })

  test('Can generate computed values with seed values', () => {
    const nameProps = {
      fname: faker.name.firstName(),
      lname: faker.name.lastName()
    }
    const PersonSpec = new HelixSpec({
      id: faker.random.number(),
      name: faker.computed(nameProps)(props => {
        return `${props.fname} ${props.lname}`
      })
    })

    const fixture = PersonSpec.seed(2).generate()
    const fixture2 = PersonSpec.seed(2).generate()

    expect(fixture.name).toBe(fixture2.name)
  })
})
