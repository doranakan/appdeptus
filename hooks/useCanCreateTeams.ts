import { type Army } from 'appdeptus/models'
import { useMemo } from 'react'

const useCanCreateTeams = (roster: Army['roster']) =>
  useMemo(
    () =>
      roster.filter(({ type }) => type === 'leader').length > 0 &&
      roster.filter(({ type }) => type === 'squad').length > 0,
    [roster]
  )

export default useCanCreateTeams
