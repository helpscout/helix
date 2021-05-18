import faker from '../'

test('Methods should return functions', () => {
  const o = faker.datatype.number()
  const results = o()

  expect(typeof o).toBe('function')
  expect(typeof results).toBe('number')
})

describe('seed', () => {
  test('Seed method should work', () => {
    faker.seed(1)
    const one = faker.datatype.number()()
    faker.seed(2)
    const two = faker.datatype.number()()
    faker.seed(1)
    const three = faker.datatype.number()()

    expect(one).not.toBe(two)
    expect(two).not.toBe(three)
    expect(one).toBe(three)
  })
})

describe('computed', () => {
  test('Throws if props object is invalid', () => {
    expect(() => faker.computed()()).toThrow()
    expect(() => faker.computed([])()).toThrow()
    expect(() => faker.computed(faker.name.firstName)()).toThrow()
    expect(() => faker.computed(faker.name.firstName())()).toThrow()
  })

  test('Throws if seed value is invalid', () => {
    expect(() => faker.computed({}, true)()).toThrow()
    expect(() => faker.computed({}, [])()).toThrow()
    expect(() => faker.computed({}, '2')()).toThrow()
  })

  test('Returns a function', () => {
    const props = {
      fname: faker.name.firstName(),
      lname: faker.name.lastName()
    }
    const value = faker.computed(props)((values) => {
      const { fname, lname } = values
      return `${fname} ${lname}`
    })

    expect(typeof value).toBe('function')
    expect(typeof value()).toBe('string')
  })

  test('Can generate computed values', () => {
    const props = {
      fname: faker.name.firstName(),
      lname: faker.name.lastName()
    }
    const value = faker.computed(props)((values) => {
      const { fname, lname } = values
      return `${fname} ${lname}`
    })()

    expect(value.split(' ').length).toBe(2)
  })

  test('Can take in seed value, as second argument', () => {
    const props = {
      fname: faker.name.firstName(),
      lname: faker.name.lastName()
    }
    const value = faker
      .computed(props)((values) => {
        const { fname, lname } = values
        return `${fname} ${lname}`
      })(2)
      .split(' ')

    faker.seed(2)
    const fname = props.fname()
    faker.seed(2)
    const lname = props.lname()

    expect(fname).toBe(value[0])
    expect(lname).toBe(value[1])
  })

  test('Can compute non-faker method props', () => {
    const props = {
      fname: 'Dino',
      lname: 'Saur'
    }
    const value = faker.computed(props)((values) => {
      const { fname, lname } = values
      return `${fname} ${lname}`
    })()

    expect(value).toBe('Dino Saur')
  })

  test('Can generate nested computed values', () => {
    const props = {
      vip: {
        person: {
          fname: faker.name.firstName(),
          lname: faker.name.lastName()
        }
      }
    }

    const value = faker
      .computed(props)((values) => {
        const { fname, lname } = values.vip.person
        return `${fname} ${lname}`
      })(2)
      .split(' ')

    faker.seed(2)
    const fname = props.vip.person.fname()
    faker.seed(2)
    const lname = props.vip.person.lname()

    expect(fname).toBe(value[0])
    expect(lname).toBe(value[1])
  })

  test('Can generate nested + array computed values', () => {
    const props = {
      vip: [
        {
          fname: faker.name.firstName(),
          lname: faker.name.lastName()
        }
      ]
    }

    const value = faker
      .computed(props)((values) => {
        const { fname, lname } = values.vip[0]
        return `${fname} ${lname}`
      })(2)
      .split(' ')

    faker.seed(2)
    const fname = props.vip[0].fname()
    faker.seed(2)
    const lname = props.vip[0].lname()

    expect(fname).toBe(value[0])
    expect(lname).toBe(value[1])
  })
})
