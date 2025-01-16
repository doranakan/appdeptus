import { type Army } from 'appdeptus/models'
import { useMemo } from 'react'

const useCanEmbarkUnits = (roster: Army['roster']) =>
  useMemo(
    () => roster.filter(({ type }) => type === 'transport').length > 0,
    [roster]
  )

export default useCanEmbarkUnits
