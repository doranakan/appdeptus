import { type Community } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useMemo } from 'react'

const useIsInquisitor = (members: Community['members']) => {
  const { data: user } = useGetUserProfileQuery()
  return useMemo(
    () => members.find(({ id, role }) => role === 'admin' && id === user?.id),
    [members, user?.id]
  )
}

export default useIsInquisitor
