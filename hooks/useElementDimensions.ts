import {
  type MutableRefObject,
  type RefObject,
  useEffect,
  useState
} from 'react'
import { type NativeMethods } from 'react-native'

const useElementDimensions = <T extends NativeMethods>(
  ref: RefObject<T> | MutableRefObject<T>
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  useEffect(() => {
    ref.current?.measure((_x, _y, width, height) => {
      setDimensions({ width, height })
    })
  }, [ref])

  return dimensions
}

export default useElementDimensions
