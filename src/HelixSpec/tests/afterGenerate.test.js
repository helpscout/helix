import HelixSpec from '..'
import faker from '../../faker'

test('Throw if argument is invalid', () => {
  const person = new HelixSpec({
    id: faker.datatype.number()
  })
  expect(() => {
    person.afterGenerate(true)
  }).toThrow()
  expect(() => {
    person.afterGenerate('name')
  }).toThrow()
  expect(() => {
    person.afterGenerate(false)
  }).toThrow()
})

test('Can adjust data after generating', () => {
  const person = new HelixSpec({
    id: faker.datatype.uuid(),
    number: faker.datatype.number()
  })
  person.afterGenerate((data) => {
    return {
      name: 'Alice',
      prevNumber: data.number,
      number: 123
    }
  })

  const fixture = person.generate()

  expect(typeof fixture.id).toBe('undefined')
  expect(fixture.name).toBe('Alice')
  expect(fixture.number).toBe(123)
  expect(typeof fixture.prevNumber).toBe('number')
})
