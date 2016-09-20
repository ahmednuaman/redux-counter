import { expect } from 'chai'
import sinon from 'sinon'
import test from 'ava'
import increment from '../../../../src/js/redux/action/increment'

test('increment', () => {
  const store = {
    dispatch: sinon.spy()
  }

  increment(store)()
  expect(store.dispatch.called).to.be.true
  expect(store.dispatch.calledWith({ type: 'INCREMENT' })).to.be.true
})
