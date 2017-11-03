import generateSpecs from '../generateSpecs'
import { default as faker } from '../../faker'

test('Throws if argument is invalid', () => {
  expect(() => generateSpecs()).toThrow()
  expect(() => generateSpecs(true)).toThrow()
  expect(() => generateSpecs(132)).toThrow()
})

test('Throws if seedValue argument is invalid', () => {
  expect(() => generateSpecs({}, true)).toThrow()
  expect(() => generateSpecs({}, '1')).toThrow()
  expect(() => generateSpecs({}, [])).toThrow()
})

test('Generates computed values', () => {
  const nameProps = {
    fname: faker.name.firstName(),
    lname: faker.name.lastName()
  }
  const shape = {
    name: faker.computed(nameProps)(props => {
      return `${props.fname} ${props.lname}`
    })
  }

  const o = generateSpecs(shape)

  expect(typeof o.name).toBe('string')
  expect(o.name.split(' ').length).toBe(2)
})
