import HelixSpec from './index'
import { isComputedValue } from '../faker'
import { isDerivedValue } from '../derived'
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
    return isComputedValue(shape) ? shape(seedValue) : shape()
  }
  if (shape instanceof HelixSpec) {
    return shape.generate()
  }
  const derivedProps = {}
  const fixture = mapValues(shape, (value, key) => {
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
      if (isComputedValue(value)) {
        return value(seedValue)
      } else if (isDerivedValue(value)) {
        derivedProps[key] = value
        return
      } else {
        return value()
      }
    }
    return value
  })

  const derivedFixture = mapValues(derivedProps, (value, key) => {
    return value(fixture)
  })

  return Object.assign(fixture, derivedFixture)
}

export default generateSpecs
