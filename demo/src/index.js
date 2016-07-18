import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'

import Meticulous, { protect } from '../../src'


const DummyComponent = ({ text }) => <div>{ text }</div>

class TestComponent extends Component {
  render() {
    const { requiredString, optionalString } = this.props
    return <div>{requiredString} {optionalString}</div>
  }
}
TestComponent.propTypes = {
  optionalString: PropTypes.string,
  requiredString: PropTypes.string.isRequired
}

const ProtectedComponent = protect(TestComponent)
const ProtectedStatelessComponent = protect(DummyComponent)

class Demo extends Component {
  render() {
    return <div>
      <h1>Meticulous Demo</h1>

      <h2>Will log error:</h2>
      <Meticulous>
        {1}
        <div>div</div>
        <DummyComponent text="unprotected Stateless Component" />{/* will cause console.error */}
        <ProtectedComponent requiredString="required string" />
        <ProtectedComponent requiredString="required string" optionalString="optional string" />
        <ProtectedComponent requiredString="required string (not allowed)" forbiddenProp="this is not allowed"/>{/* will cause console.error */}
      </Meticulous>


      <h2>Will not cause error:</h2>
      <Meticulous>
        <ProtectedComponent requiredString="required string" />
        <ProtectedComponent requiredString="required string" optionalString="optional string" />
      </Meticulous>

      <h2>Can be used without Meticulous wrapper (to just check for proptypes):</h2>
      <div>
        {1}{/* will _NOT_ cause console.error */}
        <div>div</div>{/* will _NOT_ cause console.error */}
        <DummyComponent />{/* will _NOT_ cause console.error */}
        <ProtectedComponent requiredString="required string" />
        <ProtectedComponent requiredString="required string" optionalString="optional string" />
        <ProtectedComponent requiredString="required string (not allowed)" forbiddenProp="this is not allowed"/>{/* will cause console.error */}
      </div>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
