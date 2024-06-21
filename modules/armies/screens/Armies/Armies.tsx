import { Box, HStack, Image, VStack } from '@gluestack-ui/themed'
import { armyBuilderBackground } from 'appdeptus/assets'
import { Button, Loading } from 'appdeptus/components'
import { Heading } from 'appdeptus/designSystem'
import { useRouter } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetArmiesQuery } from '../../api'
import ArmyList from './ArmyList'

const ArmiesScreen = () => {
  const router = useRouter()

  const { data } = useGetArmiesQuery()

  if (!data) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <Image
        alt=''
        w='$full'
        h='$full'
        source={armyBuilderBackground}
        opacity='$50'
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
