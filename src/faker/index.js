import { cloneDeep, isObject, isFunction, mapValues } from 'lodash'
import fakerLib from 'faker'

const remapFakerObject = (object) => {
  return mapValues(object, (value, key) => {
    if (isObject(value) && !isFunction(value)) {
      return remapFakerObject(value)
    }
    if (isFunction(value)) {
      return (...args) => () => value(...args)
    }
    return value
  })
}

const faker = remapFakerObject(cloneDeep(fakerLib))
faker.fake = (...args) => fakerLib.fake(...args)
faker.seed = (...args) => fakerLib.seed(...args)

export default faker
