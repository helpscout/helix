import faker from 'faker'
import { cloneDeep, isObject, isFunction, isNumber, mapValues } from 'lodash'
import Exception from '../utils/log'

class Spec {
  constructor (props) {
    this.props = props
    this.seedNumber = null
    return this
  }

  generate (count = 0) {
    if (!isNumber(count)) {
      throw Exception('Spec.generate()', 'Argument must be a valid number.')
    }
    const newProps = count ?
      [...Array(count)].map(() => {
        this.seed(this.seedNumber)
        return generateProps(this.props)
      }) :
      generateProps(this.props)

    this.seedNumber = null
    this.seed() // resets Faker
    return newProps
  }

  seed (number) {
    this.seedNumber = number
    faker.seed(this.seedNumber)
    return this
  }
}

const generateProps = (props) => {
  return mapValues(cloneDeep(props), (value, key) => {
    if (isObject(value) && !isFunction(value)) {
      return generateProps(value)
    }
    if (isFunction(value)) {
      return value()
    }
    return value
  })
}

export default Spec
