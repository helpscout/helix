import {
  isFunction,
  isObject,
  mapValues
} from 'lodash'

/**
 * Function remap the Faker class/object, to replace methods with functions
 * that don't automatically execute. This function works recursively to walk
 * down the entire Faker API tree.
 *
 * @param object    $object     Faker object/nested Faker object
 *
 * @returns object
 */
const remapFakerObject = object => {
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

export default remapFakerObject
