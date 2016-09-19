import React from 'react'
import { render } from 'react-dom'
import store from 'reduxstore/store'
import { decrement, increment } from 'reduxstore/action/index'

class Counter extends React.Component {

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()

      this.state.count = state.counter
    }
  }

  increment() {
    increment()
  }

  decrement() {
    decrement()
  }

  render() {
    const count = this.state.count
    return (
      <div className="row">
        <div className="col-xs-8">
          <input className="form-control input-lg" value="{count}" />
        </div>
        <div className="col-xs-4">
          <div className="btn-group">
            <button className="btn btn-default btn-lg" onClick="{this.increment()}">+</button>
            <button className="btn btn-default btn-lg" onClick="{this.decrement()}">-</button>
          </div>
        </div>
      </div>
    )
  }
}

const Counter = React.createClass({
  ,

  increment: () => increment(),

  decrement: () => decrement(),

  render: () => (
    
  )
})

render(<Counter />, document.getElementById('app'))
