export const isDerivedValue = (generator) => generator.isDerivedValue

const derived = (mapper) => {
  const generator = (shape) => mapper(shape)
  generator.isDerivedValue = true
  return generator
}

export default derived
