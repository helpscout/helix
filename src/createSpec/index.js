import { isObject } from 'lodash'
import HelixSpec from '../Spec'
import { Exception } from '../utils/log'

/**
 * Creates the Spec "definition". Returns a HelixSpec class.
 *
 * @param object    $specs     Fixture shape, that contains Faker render API
 *
 * @returns class
 */
const createSpec = (specs) => {
  if (Array.isArray(specs) || !isObject(specs)) {
    throw new Exception('createSpec', 'Argument must be a valid object.')
  }

  return new HelixSpec(specs)
}

export default createSpec
