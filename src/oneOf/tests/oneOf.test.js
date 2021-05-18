import { times } from 'lodash'
import oneOf from '../index'
import HelixSpec from '../../HelixSpec/index'
import compose from '../../compose/index'
import faker from '../../faker/index'
import { Exception } from '../../utils/log'

describe('oneOf tests', () => {
  test('Should throw if argument(s) are invalid', () => {
    expect(() => {
      oneOf()
    }).toThrow()
    expect(() => {
      oneOf('abc')
    }).toThrow()
    expect(() => {
      oneOf({})
    }).toThrow()
    expect(() => {
      oneOf([])
    }).toThrow()
    expect(() => {
      oneOf([{ id: 123 }])
    }).not.toThrow()
  })

  test('oneOf returns a generator that returns instances of one of N options', () => {
    const dinosaurShape = {
      id: faker.datatype.number(),
      name: faker.name.firstName()
    }
    const Dinosaur = new HelixSpec(dinosaurShape)
    const Tyrannosaurus = compose(Dinosaur, { type: 'Tyrannosaurus' })
    const Stegosaurus = compose(Dinosaur, { type: 'Stegosaurus' })
    // Can be either object or HelixSpec
    const Pterodactyl = Object.assign({}, dinosaurShape, {
      type: 'Pterodactyl'
    })

    const RandomDinosaur = oneOf([Tyrannosaurus, Stegosaurus, Pterodactyl])
    let tyrannosaurusCount = 0
    let stegosaurusCount = 0
    let pterodactylCount = 0
    times(40, (index) => {
      const dino = RandomDinosaur.seed(index).generate()
      expect(dino.type).toMatch(/(Tyrannosaurus)|(Stegosaurus)|(Pterodactyl)/)
      switch (dino.type) {
        case 'Tyrannosaurus':
          tyrannosaurusCount++
          break
        case 'Stegosaurus':
          stegosaurusCount++
          break
        case 'Pterodactyl':
          pterodactylCount++
          break
        default:
          throw new Exception('invalid dino type!', dino.type)
      }
      expect(typeof dino.name).toBe('string')
    })
    // make sure we created at least 1 of each
    expect(tyrannosaurusCount).toBeGreaterThan(0)
    expect(stegosaurusCount).toBeGreaterThan(0)
    expect(pterodactylCount).toBeGreaterThan(0)
  })
})
