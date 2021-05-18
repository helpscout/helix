import HelixSpec from '..'
import faker from '../../faker'

test('Can extend base specs', () => {
  const person = new HelixSpec({
    id: faker.datatype.number(),
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
    id: faker.datatype.number(),
    fname: 'Ava'
  })
  person.extend(
    {
      fname: faker.name.firstName(),
      lname: 'Smith'
    },
    {
      count: faker.datatype.number()
    },
    {
      active: true
    }
  )
  const fixture = person.generate()

  expect(typeof fixture.id).toBe('number')
  expect(fixture.fname).not.toBe('Ava')
  expect(typeof fixture.fname).toBe('string')
  expect(fixture.lname).toBe('Smith')
  expect(typeof fixture.count).toBe('number')
  expect(fixture.active).toBe(true)
})
