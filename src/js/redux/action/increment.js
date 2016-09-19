import store from '../store'

export default () => store.dispatch({ type: 'INCREMENT' })
