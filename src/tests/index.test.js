import {
  createSpec,
  faker
} from '..'

test('createSpec should be exported', () => {
  expect(createSpec).toBeTruthy()
})

test('faker should be exported', () => {
  expect(faker).toBeTruthy()
})
