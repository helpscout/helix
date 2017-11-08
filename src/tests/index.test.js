import {
  compose,
  createSpec,
  faker,
  oneof
} from '..'

test('compose should be exported', () => {
  expect(compose).toBeTruthy()
})

test('createSpec should be exported', () => {
  expect(createSpec).toBeTruthy()
})

test('faker should be exported', () => {
  expect(faker).toBeTruthy()
})

test('oneof should be exported', () => {
  expect(oneof).toBeTruthy()
})
