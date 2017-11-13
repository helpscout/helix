import createSpec from '../../createSpec'
import faker from '../../faker'
import derived from '..'

test('Can combine simple props', () => {
  const Spec = createSpec({
    fname: () => 'Alice',
    lname: () => 'Baker',
    name: derived(({ fname, lname }) => `${fname} ${lname}`)
  })
  const fixture = Spec.generate()

  expect(fixture.name).toBe('Alice Baker')
})

test('Can have multiple derived', () => {
  const Spec = createSpec({
    fname: () => 'Alice',
    lname: () => 'Baker',
    rollCall: derived(({ fname, lname }) => `${lname}, ${fname}`),
    fancyName: derived(({ fname }) => fname.split('').join('*').toUpperCase())
  })
  const fixture = Spec.generate()

  expect(fixture.rollCall).toBe('Baker, Alice')
  expect(fixture.fancyName).toBe('A*L*I*C*E')
})

test('Can remap over a derived array', () => {
  const Spec = createSpec({
    numbers: () => [1, 2, 3],
    total: derived(({ numbers }) => numbers.reduce((sum, x) => sum + x))
  })
  const fixture = Spec.generate()

  expect(fixture.total).toBe(6)
})

test('Derived props are invisible to each other during generate', () => {
  const Spec = createSpec({
    chickens: faker.random.number(),
    horses: faker.random.number(),
    A: derived(({ B }) => typeof B === 'undefined'),
    B: derived(({ A }) => typeof A === 'undefined')
  })
  const fixture = Spec.generate()

  expect(fixture.A).toBe(true)
  expect(fixture.B).toBe(true)
})

test('Derived props should respect seed values', () => {
  const Spec = createSpec({
    fname: faker.name.firstName(),
    lname: faker.name.lastName(),
    name: derived(({ fname, lname }) => `${fname} ${lname}`)
  })
  const fixtureA = Spec.seed(2).generate()
  const fixtureB = Spec.seed(2).generate()

  expect(fixtureA.name).toBe(fixtureB.name)
})
