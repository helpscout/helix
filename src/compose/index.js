import { isObject } from 'lodash'
import HelixSpec from '../HelixSpec'
import { Exception } from '../utils/log'

const compose = (...specs) => {
  if (![...specs].length) {
    throw new Exception('compose', 'Argument(s) must be defined')
  }

  const composedSpecs = [...specs].reduce((newSpecs, spec) => {
    if (!spec || !isObject(spec)) {
      throw new Exception('compose', 'Argument(s) must be a valid object or HelixSpec instance.')
    }
    const extendedSpec = spec instanceof HelixSpec ? spec.shape : spec

    return Object.assign(newSpecs, extendedSpec)
  }, {})

  const Composed = new HelixSpec({})
  return Composed.extend(composedSpecs)
}

export default compose
