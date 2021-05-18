import HelixSpec from '..'
import faker from '../../faker'

test('Can generate computed values with props + callback', () => {
  const nameProps = {
    fname: faker.name.firstName(),
    lname: faker.name.lastName()
  }
  const PersonSpec = new HelixSpec({
    id: faker.datatype.number(),
    name: faker.computed(nameProps)((props) => {
      return `${props.fname} ${props.lname}`
    })
  })

  const fixture = PersonSpec.generate()

  expect(typeof fixture.name).toBe('string')
  expect(fixture.name.split(' ').length).toBe(2)
})

test('Can generate computed values with faker.fake', () => {
  const PersonSpec = new HelixSpec({
    id: faker.datatype.number(),
    name: faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')
  })

  const fixture = PersonSpec.generate()

  expect(typeof fixture.name).toBe('string')
  expect(fixture.name.split(' ').length).toBe(3)
})

test('Can seed and generate computed values with faker.fake', () => {
  const PersonSpec = new HelixSpec({
    id: faker.datatype.number(),
    name: faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}')
  })

  const one = PersonSpec.seed(1).generate()
  const two = PersonSpec.seed(1).generate()

  expect(one.name).toBe(two.name)
})
