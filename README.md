# react-meticulous

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

react-meticulous makes your React Components more strict. You can only pass properties that are available in your components propTypes.

## Motivation

If protect() is used it'll make sure you don't forget to add propTypes to your (new) Components without forcing you to update all your existing Components.
Other benefits can come from smaller props objects that could speed up your shouldComponentUpdate methods.

TODO: strip checks in production build.


[build-badge]: https://img.shields.io/travis/user/repo/master.svg?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.svg?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo


## Usage:

```js
import Meticulous, { protect } from 'react-meticulous'

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
```


### Will log error:
```js
render() {
  return (
    <Meticulous>
      {1}
      <div>div</div>
      <DummyComponent text="unprotected Stateless Component" />{/* will cause console.error */}
      <ProtectedComponent requiredString="required string" />
      <ProtectedComponent requiredString="required string" optionalString="optional string" />
      <ProtectedComponent requiredString="required string (not allowed)" forbiddenProp="this is not allowed"/>{/* will cause console.error */}
    </Meticulous>
  )
}
```

### Will not cause error:
```js
render() {
  return (
    <Meticulous>
      <ProtectedComponent requiredString="required string" />
      <ProtectedComponent requiredString="required string" optionalString="optional string" />
    </Meticulous>
  )
}
```

### Can be used without Meticulous wrapper (to just check for proptypes)
```js
render() {
  return (
    <div>
      {1}{/* will _NOT_ cause console.error */}
      <div>div</div>{/* will _NOT_ cause console.error */}
      <DummyComponent />{/* will _NOT_ cause console.error */}
      <ProtectedComponent requiredString="required string" />
      <ProtectedComponent requiredString="required string" optionalString="optional string" />
      <ProtectedComponent requiredString="required string (not allowed)" forbiddenProp="this is not allowed"/>{/* will cause console.error */}
    </div>
  )
}
```
