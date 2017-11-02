import faker from 'faker'
import { cloneDeep, isObject, isFunction, mapValues } from 'lodash'

class Spec {
  constructor (props) {
    this.props = props
    return this
  }

  generate () {
    const newProps = generateProps(this.props)
    this.seed() // resets Faker
    return newProps
  }

  seed (number) {
    faker.seed(number)
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
