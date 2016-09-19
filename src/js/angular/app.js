import angular from 'angular'
import store from 'reduxstore/store'
import { decrement, increment } from 'reduxstore/action/index'

angular.module('app', [])
.directive('counter', () => {
  return {
    link: ($scope) => {
      store.subscribe(() => {
        const state = store.getState()

        $scope.count = state.counter
      })
    }
  }
})
.directive('counterButtons', () => {
  return {
    link: ($scope) => {
      $scope.decrement = () => decrement()
      $scope.increment = () => increment()
    }
  }
})
