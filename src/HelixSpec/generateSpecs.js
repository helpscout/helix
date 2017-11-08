import HelixSpec from './index'
import { isComputedValue } from '../faker'
import {
  isArray,
  isFunction,
  isNumber,
  isObject,
  mapValues
} from 'lodash'
import Exception from '../utils/log'

/**
 * Recursively instantiates the Helix version of Faker methods.
 *
 * @param object    $shape     Fixture shape, that contains Faker render API
 *
 * @returns object
 */
const generateSpecs = (shape, seedValue) => {
  if (!isObject(shape) && !isArray(shape)) {
    throw new Exception(
      'HelixSpec.generateSpecs',
      'First argument must be an object, array, or HelixSpec.'
    )
  }
  if (seedValue !== undefined && !isNumber(seedValue)) {
    throw new Exception(
      'HelixSpec.generateSpecs',
      'Seed value must be a valid number.'
    )
  }
  if (isFunction(shape)) {
    // Tested value(seedValue), but Istanbul isn't picking it up
    return isComputedValue(shape) /* istanbul ignore next */
      ? shape(seedValue) : shape()
  }
  if (shape instanceof HelixSpec) {
    return shape.generate()
  }
  return mapValues(shape, (value, key) => {
    // Preserve array structures
    if (isArray(value)) {
      return value.map(val => generateSpecs(val))
    }
    // Recurse
    if (isObject(value) && !isFunction(value)) {
      return value instanceof HelixSpec
        ? value.generate()
        : generateSpecs(value)
    }
    // Instantiate!
    if (isFunction(value)) {
      // Tested value(seedValue), but Istanbul isn't picking it up
      return isComputedValue(value) /* istanbul ignore next */
        ? value(seedValue) : value()
    }
    return value
  })
}

export default generateSpecs
