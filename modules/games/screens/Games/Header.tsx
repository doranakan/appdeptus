import { NavigationHeader } from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Swords } from 'lucide-react-native'
import { memo } from 'react'

const Header = () => {
  const { data } = useGetUserProfileQuery()

  return (
    <NavigationHeader
      variant='avatar'
      user={data}
      rightButton={{
        href: 'games/new',
        icon: Swords,
        variant: 'link'
      }}
    />
  )
}

export default memo(Header)
