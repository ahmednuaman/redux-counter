import React from 'react'
import { render } from 'react-dom'
import { decrement, increment } from 'reduxstore/action/index'

export default () =>
  <div className='btn-group'>
    <button className='btn btn-default btn-lg' onClick={increment}>+</button>
    <button className='btn btn-default btn-lg' onClick={decrement}>-</button>
  </div>
