import { expect } from 'chai'
import sinon from 'sinon'
import test from 'ava'
import decrement from '../../../../src/js/redux/action/decrement'

test('decrement', () => {
  const store = {
    dispatch: sinon.spy()
  }

  decrement(store)()
  expect(store.dispatch.called).to.be.true
  expect(store.dispatch.calledWith({ type: 'DECREMENT' })).to.be.true
})
