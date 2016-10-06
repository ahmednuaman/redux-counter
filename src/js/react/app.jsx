import autobind from 'autobind-decorator'
import React from 'react'
import { render } from 'react-dom'
import store from 'reduxstore/store'
import Buttons from './buttons.component'
import Counter from './counter.component'

@autobind
class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  componentDidMount () {
    this.subscribeToStore()
  }

  subscribeToStore () {
    store.subscribe(() => {
      const state = store.getState()

      this.setState({ count: state.counter })
    })
  }

  render () {
    return (
      <div className='row'>
        <div className='col-xs-8'>
          <Counter count={this.state.count} />
        </div>
        <div className='col-xs-4'>
          <Buttons />
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
