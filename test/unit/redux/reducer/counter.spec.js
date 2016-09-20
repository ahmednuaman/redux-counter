import { expect } from 'chai'
import test from 'ava'
import counter from '../../../../src/js/redux/reducer/counter'

test('counter', () => {
  expect(counter(undefined, { type: 'INCREMENT' })).to.equal(1)
  expect(counter(undefined, { type: 'DECREMENT' })).to.equal(-1)
  expect(counter(undefined, { type: 'foo' })).to.equal(0)
  expect(counter(1, { type: 'INCREMENT' })).to.equal(2)
  expect(counter(1, { type: 'DECREMENT' })).to.equal(0)
})
