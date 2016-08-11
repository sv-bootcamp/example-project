import React, { Component, PropTypes } from 'react'

class MyCounter extends Component {
  constructor(props) {
    super(props)
    // this.incrementAsync = this.incrementAsync.bind(this)
    // this.incrementIfOdd = this.incrementIfOdd.bind(this)

    this.props.onIncrement()    
    
  }

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }  

  render() {
    const { value, onIncrement } = this.props
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}                        
      </p>
    )
  }
}

MyCounter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired  
}

export default MyCounter
