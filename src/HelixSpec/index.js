import faker from 'faker'
import { isNumber } from 'lodash'
import Exception from '../utils/log'
import generateSpecs from './generateSpecs'

/**
 * Class for a HelixSpec definition. This class contains methods to
 * generate the final fixture object, as well as methods to seed Faker
 * fixture data.
 *
 * @param object    $shape     Fixture shape, that contains Faker render API
 *
 * @returns class
 */
class HelixSpec {
  constructor (shape) {
    this.shape = shape
    this.seedValue = undefined
    return this
  }

  extend (...specs) {
    this.shape = Object.assign(this.shape, ...specs)
    return this
  }

  generate (count = 0, max) {
    if (!isNumber(count)) {
      throw Exception('HelixSpec.generate()', 'Argument must be a valid number.')
    }
    if (max !== undefined) {
      if (!isNumber(max)) {
        throw Exception('HelixSpec.generate()', 'Max argument must be a valid number.')
      }
      if (max <= count) {
        throw Exception('HelixSpec.generate()', 'Max argument must be larger than count argument.')
      }
      count = faker.random.number({min: count, max})
    }

    const generatedSpecs = count
      ? [...Array(count)].map(() => {
        // Respect seed value for multi-generated specs
        this.seed(this.seedValue)
        return generateSpecs(this.shape, this.seedValue)
      })
      : generateSpecs(this.shape, this.seedValue)

    this.seedValue = undefined
    return generatedSpecs
  }

  seed (seedValue) {
    if (seedValue !== undefined && !isNumber(seedValue)) {
      throw new Exception(
        'HelixSpec.seed()',
        'Seed value must be a valid number.'
      )
    }
    if (seedValue !== undefined) {
      this.seedValue = seedValue
      faker.seed(this.seedValue)
    }
    return this
  }
}

export default HelixSpec
