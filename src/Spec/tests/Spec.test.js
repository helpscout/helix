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

  test('Can generate multiple specs', () => {
    const MessageSpec = new Spec({
      id: faker.random.number(),
      read: faker.random.boolean(),
      timestamp: faker.date.past(),
      message: faker.lorem.paragraph()
    })

    const fixture = MessageSpec.generate(5)

    expect(Array.isArray(fixture)).toBeTruthy()
    expect(fixture[0].id).not.toBe(fixture[1].id)
  })

  test('Can be nested', () => {
    const MessageSpec = new Spec({
      id: faker.random.number(),
      read: faker.random.boolean(),
      timestamp: faker.date.past(),
      message: faker.lorem.paragraph()
    })
    const ConvoSpec = new Spec({
      from: {
        name: faker.name.firstName(),
        email: faker.internet.email()
      },
      to: {
        name: faker.name.firstName(),
        email: faker.internet.email()
      },
      messages: MessageSpec.generate(5)
    })

    const fixture = ConvoSpec.generate()

    expect(typeof fixture.from).toBe('object')
    expect(typeof fixture.from.name).toBe('string')
    expect(typeof fixture.from.email).toBe('string')
    expect(typeof fixture.to).toBe('object')
    expect(typeof fixture.to.name).toBe('string')
    expect(typeof fixture.to.email).toBe('string')
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

  test('Can generate multiple specs, but with the same seed', () => {
    const MessageSpec = new Spec({
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
