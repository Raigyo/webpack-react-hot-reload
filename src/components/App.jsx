import { hot } from 'react-hot-loader/root'
import React from 'react'
import Hello from './Hello'

class App extends React.Component {
  render () {
    return <Hello name={'belgium'}/>
  }
}
export default hot(App);

