import HelixSpec from '..'
import faker from '../../faker'
import { times } from 'lodash'

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
})
