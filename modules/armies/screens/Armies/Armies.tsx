import { Box, Heading, HStack, VStack } from '@gluestack-ui/themed'
import { BackgroundImage, Button, Loading } from 'appdeptus/components'
import { setColorMode } from 'appdeptus/designSystem'
import { useFocusEffect, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Plus } from 'lucide-react-native'
import { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useGetArmiesQuery } from '../../api'
import ArmyList from './ArmyList'

const ArmiesScreen = () => {
  const dispatch = useDispatch()

  const router = useRouter()

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
      <StatusBar
        animated
        style='dark'
      />
      <BackgroundImage
        source='army-builder-bkg'
        opacity={0.5}
      />
      <SafeAreaView
        edges={['top']}
        style={styles.flex1}
      >
        <Box
          flex={1}
          gap='$4'
          px='$4'
        >
          <HStack
            alignItems='center'
            justifyContent='space-between'
          >
            <Heading size='3xl'>Your armies</Heading>
            <Button
              borderRadius='$full'
              Icon={Plus}
              onPress={() => {
                router.push('armies/army-builder/codex-selection')
              }}
            />
          </HStack>
          <ArmyList armies={data} />
        </Box>
      </SafeAreaView>
    </VStack>
  )
}

const styles = StyleSheet.create({
  flex1: {
    height: '100%',
    position: 'absolute',
    width: '100%'
  }
})

export default ArmiesScreen
