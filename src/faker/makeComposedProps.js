import {
  isArray,
  isFunction,
  isPlainObject,
  mapValues
} from 'lodash'

/**
 * Recursively renders faker methods. This function is used in the
 * faker.computed method.
 *
 * @param object      $faker      Faker class/object
 * @param object      $props      Faker values to render
 * @param number      $seedValue  Seed value for Faker
 *
 * @returns object
 */
const makeComposedProps = faker => (props, seedValue) => {
  return mapValues(props, (value, key) => {
    if (isPlainObject(value)) {
      return makeComposedProps(faker)(value, seedValue)
    }
    if (isArray(value)) {
      return value.map(val => makeComposedProps(faker)(val, seedValue))
    }
    if (seedValue) {
      faker.seed(seedValue)
    }
    return isFunction(value) ? value() : value
  })
}

export default makeComposedProps
