import faker from 'faker'
import {
  isArray,
  isFunction,
  isNumber,
  isObject,
  mapValues
} from 'lodash'
import Exception from '../utils/log'

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
    this.seedNumber = null
    return this
  }

  generate (count = 0, max) {
    if (!isNumber(count)) {
      throw Exception('HelixSpec.generate()', 'Argument must be a valid number.')
    }

    if (max !== undefined) {
      count = faker.random.number({min: count, max})
    }

    const generatedSpecs = count
      ? [...Array(count)].map(() => {
        // Respect seed value for multi-generated specs
        this.seed(this.seedNumber)
        return generateSpecs(this.shape)
      })
      : generateSpecs(this.shape)

    this.seedNumber = null
    this.seed() // resets Faker
    return generatedSpecs
  }

  seed (number) {
    this.seedNumber = number
    faker.seed(this.seedNumber)
    return this
  }
}

/**
 * Recursively instantiates the Helix version of Faker methods.
 *
 * @param object    $shape     Fixture shape, that contains Faker render API
 *
 * @returns object
 */
const generateSpecs = (shape) => {
  return mapValues(shape, (value, key) => {
    // Preserve array structures
    if (isArray(value)) {
      return value.map(val => generateSpecs(val))
    }
    // Recurse
    if (isObject(value) && !isFunction(value)) {
      return generateSpecs(value)
    }
    // Instantiate!
    if (isFunction(value)) {
      return value()
    }
    return value
  })
}

export default HelixSpec
