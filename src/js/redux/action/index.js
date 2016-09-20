import store from '../store'
import decrementAction from './decrement'
import incrementAction from './increment'

export const decrement = decrementAction(store)
export const increment = incrementAction(store)
