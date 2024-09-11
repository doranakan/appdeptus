import { Loading } from 'appdeptus/components'
import { VStack } from 'appdeptus/components/ui/vstack'
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
    <VStack className='flex-1'>
      <Background />
      <VStack className={` pt-${insets.top} flex-1 gap-4 px-4 `}>
        <Header />
        <ArmyList armies={data} />
      </VStack>
    </VStack>
  )
}

export default ArmiesScreen
