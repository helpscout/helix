import HelixSpec from '..'
import faker from '../../faker'

test('Throw if argument is invalid', () => {
  const person = new HelixSpec({
    id: faker.random.number()
  })
  expect(() => { person.beforeGenerate(true) }).toThrow()
  expect(() => { person.beforeGenerate('name') }).toThrow()
  expect(() => { person.beforeGenerate(false) }).toThrow()
})

test('Can adjust shape before generating', () => {
  const person = new HelixSpec({
    id: faker.random.uuid()
  })
  person.beforeGenerate(({ id }) => {
    return {
      id,
      name: 'Alice',
      number: faker.random.number()
    }
  })

  const fixture = person.generate()

  expect(typeof fixture.id).toBe('string')
  expect(fixture.name).toBe('Alice')
  expect(typeof fixture.number).toBe('number')
})

