import { NavigationHeader } from 'appdeptus/components'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Swords } from 'lucide-react-native'
import { memo } from 'react'

const Header = () => {
  const { data: user } = useGetUserProfileQuery()

  const { data: armies } = useGetArmyListQuery()

  return (
    <NavigationHeader
      variant='avatar'
      user={user}
      rightButton={{
        disabled: !armies?.length,
        href: 'games/new',
        icon: Swords,
        variant: 'link'
      }}
    />
  )
}

export default memo(Header)
