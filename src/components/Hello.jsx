import { hot } from 'react-hot-loader/root'
import React from 'react'

class Hello extends React.Component {
  constructor (props) {
    super(props)
    this.increment = this.increment.bind(this)
    this.state = {
      counter: 0
    }
  }

  render () {
    return <div>
      <div>Hello {this.props.name}!</div>
      <div>Counter: {this.state.counter}
        {this.state.counter > 10 && <div>You have exceeded 10!</div>}
        <button onClick={this.increment}>Increment</button>
      </div>
    </div>
  }

  increment () {
    this.setState({counter: this.state.counter + 1})
  }
}

export default hot(Hello)