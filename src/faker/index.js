import {
  isFunction
} from 'lodash'
import fakerLib from 'faker'
import computed from './computed'
import remapFakerObject from './remapFakerObject'

/**
 * Returns a boolean based on whether the value is a computed Faker value.
 *
 * @param function    $value     Faker method
 *
 * @returns boolean
 */
export const isComputedValue = value => {
  return isFunction(value) && value.fakerComputedValue
}

/**
 * Clones/enhances the Faker object
 * @returns object
 */
const faker = remapFakerObject(Object.assign({}, fakerLib))

// Required to mention Faker functionality
faker.seed = (...args) => fakerLib.seed(...args)
/* istanbul ignore next */
faker.fake = (...args) => fakerLib.fake(...args)

faker.computed = computed(faker)
// Add property that allows generate() to check for computedProperty
faker.computed.fakerComputedValue = true

export default faker
