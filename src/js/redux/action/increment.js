import store from '../store'

export default () => store.dispatch({ action: 'INCREMENT' })
