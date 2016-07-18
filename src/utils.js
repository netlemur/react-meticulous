import _without from 'lodash.without'
const MODULE_NAME = 'MeticulouslyProtected'

export const validateChild = (child) => {
  if (!child.type) return console.error('unexpected value as child:', typeof child, child)
  if (child.type && typeof child.type === 'string') return console.error('unexpected child of type', child.type)

  if (child.type.name !== MODULE_NAME) console.error(child.type.name, `is not ${MODULE_NAME}`, child)
}

export const protect = (ComponentToWrap) => {
  return class MeticulouslyProtected extends ComponentToWrap {
    constructor (...args) {
      super(...args)

      const currentKeys = Object.keys(this.props)
      const allowedKeys = Object.keys(this.constructor.propTypes)
      const forbiddenKeys = _without(currentKeys, ...allowedKeys)

      if (forbiddenKeys.length > 0) {
        console.error(
          super.constructor.name, 'does not allow the props ', forbiddenKeys.join(', '),
          ' – supported props:', allowedKeys.join(', ')
        )
      }
    }
  }
}
