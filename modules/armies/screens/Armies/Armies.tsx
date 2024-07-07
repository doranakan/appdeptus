import { VStack } from '@gluestack-ui/themed'
import { Loading } from 'appdeptus/components'
import { setColorMode } from 'appdeptus/designSystem'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useGetArmiesQuery } from '../../api'
import ArmyList from './ArmyList'
import Background from './Background'
import Header from './Header'

const ArmiesScreen = () => {
  const dispatch = useDispatch()

  const insets = useSafeAreaInsets()

  const { data } = useGetArmiesQuery()

  useFocusEffect(
    useCallback(() => {
      dispatch(setColorMode('light'))
    }, [dispatch])
  )

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
