import { HStack, Heading, Icon, Pressable, VStack } from '@gluestack-ui/themed'
import { Loading } from 'appdeptus/components'
import { setColorMode } from 'appdeptus/designSystem'
import { Link, useFocusEffect } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useGetArmiesQuery } from '../../api'
import ArmyList from './ArmyList'
import Background from './Background'

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
        <HStack
          alignItems='center'
          justifyContent='space-between'
        >
          <Heading
            fontFamily='$mono'
            textTransform='capitalize'
            size='4xl'
          >
            Your armies
          </Heading>
          <Link
            asChild
            href='army-builder/codex-selection'
          >
            <Pressable
              bg='$primary500'
              borderRadius='$full'
              p='$2'
            >
              <Icon
                as={Plus}
                color='$white'
                size='lg'
              />
            </Pressable>
          </Link>
        </HStack>
        <ArmyList armies={data} />
      </VStack>
    </VStack>
  )
}

export default ArmiesScreen
