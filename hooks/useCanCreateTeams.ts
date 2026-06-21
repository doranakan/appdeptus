import { type Army } from 'appdeptus/models'
import { useMemo } from 'react'

const useCanCreateTeams = (
  roster: Army['roster'],
  attachments?: Record<number, number[]>
) =>
  useMemo(() => {
    const hasSquads = roster.some(({ type }) => type === 'squad')
    if (!hasSquads) return false

    const attacherIds = roster
      .filter(({ type }) => type === 'leader' || type === 'support')
      .map(({ id }) => Number(id))

    if (!attacherIds.length) return false
    if (!attachments) return true

    return attacherIds.some((id) => (attachments[id]?.length ?? 0) > 0)
  }, [attachments, roster])

export default useCanCreateTeams
