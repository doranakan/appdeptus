import { isPlainObject, mapValues } from 'lodash'

const mapNullToUndefined = (value: unknown): unknown => {
  if (value === null) {
    return undefined
  }
  if (Array.isArray(value)) {
    return value.map(mapNullToUndefined)
  }
  if (typeof value === 'object' && isPlainObject(value)) {
    return mapValues(value, mapNullToUndefined)
  }
  return value
}

export default mapNullToUndefined
