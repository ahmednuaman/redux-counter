import store from 'reduxstore/store'
import { decrement, increment } from 'reduxstore/action/index'

const countEl = document.getElementById('count')
const decrementEl = document.getElementById('decrement')
const incrementEl = document.getElementById('increment')

decrementEl.addEventListener('click', () => decrement())
incrementEl.addEventListener('click', () => increment())

store.subscribe(() => {
  const state = store.getState()

  countEl.value = state.counter
})

countEl.value = 0
