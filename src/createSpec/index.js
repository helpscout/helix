import { isObject } from 'lodash'
import Spec from '../Spec'
import { Exception } from '../utils/log'

const createSpec = (specs) => {
  if (Array.isArray(specs) || !isObject(specs)) {
    throw new Exception('createSpec', 'Argument must be a valid object.')
  }

  return new Spec(specs)
}

export default createSpec
