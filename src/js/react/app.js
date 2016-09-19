import autobind from 'autobind-decorator'
import React from 'react'
import { render } from 'react-dom'
import store from 'reduxstore/store'
import { decrement, increment } from 'reduxstore/action/index'

@autobind
class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    this.subscribeToStore()
  }

  subscribeToStore() {
    store.subscribe(() => {
      const state = store.getState()

      this.state.count = state.counter
    })
  }

  increment() {
    increment()
  }

  decrement() {
    decrement()
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-8">
          <input className="form-control input-lg" value={this.state.count} />
        </div>
        <div className="col-xs-4">
          <div className="btn-group">
            <button className="btn btn-default btn-lg" onClick={this.increment}>+</button>
            <button className="btn btn-default btn-lg" onClick={this.decrement}>-</button>
          </div>
        </div>
      </div>
    )
  }
}

render(<Counter />, document.getElementById('app'))
