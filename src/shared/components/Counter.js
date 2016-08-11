import React, { Component, PropTypes } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.incrementIfLogin = this.incrementIfLogin.bind(this)
  }

  incrementIfLogin() {
  	this.props.onIncrement()
  }

  render() {
    const { value, onIncrement } = this.props
    return (
    	<p>
	      	Clicked: {value} times
          {' '}
          <button onClick={this.incrementIfLogin}>
            
          </button>
      </p>
    )
  }
}

//COMPONENTDIDMOUNT doc  logincheck logic  action trigger

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired
}

export default Counter