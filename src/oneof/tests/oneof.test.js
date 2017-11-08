import faker from '../../faker'
import oneof from '../'
import HelixSpec from '../../HelixSpec/'
import compose from '../../compose/'
import { times } from 'lodash'
import { Exception } from '../../utils/log'

describe('oneof tests', () => {
  test('Should throw if argument(s) are invalid', () => {
    expect(() => { oneof() }).toThrow()
    expect(() => { oneof('abc') }).toThrow()
    expect(() => { oneof({}) }).toThrow()
    expect(() => { oneof([]) }).toThrow()
    expect(() => { oneof([{id: 123}]) }).not.toThrow()
  })

  test('oneof returns a generator that returns instances of one of N options', () => {
    const dinosaurShape = {
      id: faker.random.number(),
      name: faker.name.firstName()
    }
    const Dinosaur = new HelixSpec(dinosaurShape)
    const Tyrannosaurus = compose(Dinosaur, { type: 'Tyrannosaurus' })
    const Stegosaurus = compose(Dinosaur, { type: 'Stegosaurus' })
    // Can be either object or HelixSpec
    const Pterodactyl = Object.assign({}, dinosaurShape, { type: 'Pterodactyl' })

    const RandomDinosaur = oneof([Tyrannosaurus, Stegosaurus, Pterodactyl])
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
