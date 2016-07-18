import React, { Component, PropTypes } from 'react'
import { validateChild } from './utils'

export default class Meticulous extends Component {

  constructor (props, ...rest) {
    super(props, ...rest)

    if (Array.isArray(props.children)) {
      props.children.forEach(validateChild)
    } else {
      validateChild(props.children)
    }
  }
  render () {
    return <div>{this.props.children}</div>
  }
}
Meticulous.propTypes = {
  children: PropTypes.node.isRequired
}
