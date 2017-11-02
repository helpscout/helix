import Spec from '..'
import faker from '../../faker'

describe('generate', () => {
  test('Generates fixtures from a spec object', () => {
    const person = new Spec({
      id: faker.random.number()
    })
    const fixture = person.generate()

    expect(fixture.id).toBeTruthy()
  })
})

describe('seed', () => {
  test('Can be set', () => {
    const person = new Spec({
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
    const person = new Spec({
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
})
