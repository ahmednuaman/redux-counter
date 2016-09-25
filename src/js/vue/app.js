import Vue from 'vue'
import store from 'reduxstore/store'
import { decrement, increment } from 'reduxstore/action/index'

const app = new Vue({
  el: '#app',
  data: {
    count: 0
  },
  methods: {
    increment: () => increment(),
    decrement: () => decrement()
  }
})

store.subscribe(() => {
  const state = store.getState()

  app.count = state.counter
})
