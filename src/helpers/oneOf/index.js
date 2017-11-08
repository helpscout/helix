import HelixSpec from '../../HelixSpec'
import faker from '../../faker/'
import generateSpecs from '../../HelixSpec/generateSpecs'
import { Exception } from '../../utils/log'

/**
 * Combines both HelixSpec class instance and regular objects to create a single
 * new HelixSpec class instance.
 *
 * @param object    $specs     HelixSpec class instance or objects
 *
 * @returns HelixSpec instance
 */
const oneOf = (specs) => {
  if (!Array.isArray(specs) || !specs.length) {
    throw new Exception('oneOf', 'Argument(s) must be defined')
  }

  return new HelixSpec(() => generateSpecs(faker.random.arrayElement(specs)()))
}

export default oneOf
