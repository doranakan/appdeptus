import { VStack } from '@gluestack-ui/themed'
import { Loading } from 'appdeptus/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetArmiesQuery } from '../../api'
import ArmyList from './ArmyList'
import Background from './Background'
import Header from './Header'

const ArmiesScreen = () => {
  const insets = useSafeAreaInsets()

  const { data } = useGetArmiesQuery()

  if (!data) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <Background />
      <VStack
        flex={1}
        gap='$4'
        pt={insets.top}
        px='$4'
      >
        <Header />
        <ArmyList armies={data} />
      </VStack>
    </VStack>
  )
}

export default ArmiesScreen
