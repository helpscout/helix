import { isObject, isFunction, mapValues } from 'lodash'
import fakerLib from 'faker'

/**
 * Function remap the Faker class/object, to replace methods with functions
 * that don't automatically execute. This function works recursively to walk
 * down the entire Faker API tree.
 *
 * @param object    $object     Faker object/nested Faker object
 *
 * @returns object
 */
const remapFakerObject = (object) => {
  return mapValues(object, (value, key) => {
    if (isObject(value) && !isFunction(value)) {
      return remapFakerObject(value)
    }
    if (isFunction(value)) {
      return (...args) => () => value(...args)
    }
    return value
  })
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

export default faker
