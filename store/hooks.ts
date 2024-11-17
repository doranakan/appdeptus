import { useDispatch } from 'react-redux'
import { type AppDispatch } from './types'

const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export { useAppDispatch }
