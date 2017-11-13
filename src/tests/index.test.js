import {
  compose,
  createSpec,
  derived,
  faker,
  oneOf
} from '..'

test('compose should be exported', () => {
  expect(compose).toBeTruthy()
})

test('createSpec should be exported', () => {
  expect(createSpec).toBeTruthy()
})

test('derived should be exported', () => {
  expect(derived).toBeTruthy()
})

test('faker should be exported', () => {
  expect(faker).toBeTruthy()
})

test('oneOf should be exported', () => {
  expect(oneOf).toBeTruthy()
})
