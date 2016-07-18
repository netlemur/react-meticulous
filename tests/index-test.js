import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Meticulous, { protect } from 'src/'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('renders children', () => {
    const component = (
      <Meticulous>
        Hi there!
      </Meticulous>
    )
    render(component, node, () => {
      expect(node.innerHTML).toContain('Hi there!')
    })
  })
})
