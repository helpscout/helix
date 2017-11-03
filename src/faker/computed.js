import {
  isNumber,
  isPlainObject
} from 'lodash'
import makeComposedProps from './makeComposedProps'
import Exception from '../utils/log'

/**
 * Creates a function that HelixSpec.generate can use to render computed
 * values. This function takes in the props (object), renders them using Faker,
 * then passes the remapped props to the callback function.
 *
 * @param object      $faker              Faker class/object
 * @param object      $props              Faker values to render
 * @param number      $seedValue          Seed value for Faker
 * @param function    $computedCallback   Callback to execute to render value
 *
 * @returns function
 */
const computed = faker => (props, seedValue) => computedCallback => {
  if (!isPlainObject(props)) {
    throw new Exception(
      'faker.computed',
      'First argument must be a valid object.'
    )
  }
  if (seedValue !== undefined && !isNumber(seedValue)) {
    throw new Exception(
      'faker.computed',
      'faker.seed value must be a valid number.'
    )
  }
  return (seedValue) => {
    return computedCallback(makeComposedProps(faker)(props, seedValue))
  }
}

export default computed
