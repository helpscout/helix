import compose from '..'
import HelixSpec from '../../HelixSpec'
import faker from '../../faker'

test('Should throw if argument(s) are invalid', () => {
  expect(() => { compose() }).toThrow()
  expect(() => { compose('') }).toThrow()
  expect(() => { compose(true) }).toThrow()
  expect(() => { compose({}, '') }).toThrow()
})

test('Can extend default objects', () => {
  const ComposedSpec = compose({
    fname: 'Linda'
  }, {
    lname: 'Lee'
  })
  const fixture = ComposedSpec.generate()

  expect(fixture.fname).toBe('Linda')
  expect(fixture.lname).toBe('Lee')
})

test('Can combine HelixSpecs', () => {
  const PersonSpec = new HelixSpec({
    id: faker.random.number()
  })
  const MessageSpec = new HelixSpec({
    read: faker.random.boolean(),
    timestamp: faker.date.past(),
    message: faker.lorem.paragraph()
  })

  const ComposedSpec = compose(PersonSpec, MessageSpec)
  const fixture = ComposedSpec.generate()

  expect(typeof fixture.id).toBe('number')
  expect(typeof fixture.timestamp).toBe('object')
  expect(typeof fixture.read).toBe('boolean')
  expect(typeof fixture.message).toBe('string')
})

test('Can combine HelixSpecs + objects', () => {
  const PersonSpec = new HelixSpec({
    id: faker.random.number()
  })
  const MessageSpec = new HelixSpec({
    read: faker.random.boolean(),
    timestamp: faker.date.past(),
    message: faker.lorem.paragraph()
  })
  const CustomerSpec = {
    fname: 'Linda',
    lname: 'Lee'
  }

  const ComposedSpec = compose(PersonSpec, MessageSpec, CustomerSpec)
  const fixture = ComposedSpec.generate()

  expect(typeof fixture.id).toBe('number')
  expect(typeof fixture.timestamp).toBe('object')
  expect(typeof fixture.read).toBe('boolean')
  expect(typeof fixture.message).toBe('string')
  expect(fixture.fname).toBe('Linda')
  expect(fixture.lname).toBe('Lee')
})
