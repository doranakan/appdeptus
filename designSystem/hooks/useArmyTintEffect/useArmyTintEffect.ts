import { setColorMode } from 'appdeptus/designSystem/store'
import { type CodexName } from 'appdeptus/models'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useArmyTintEffect = (codexName: CodexName) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setColorMode(codexName))

    return () => {
      dispatch(setColorMode('light'))
    }
  }, [codexName, dispatch])
}

export default useArmyTintEffect
