import { Box, HStack } from '@gluestack-ui/themed'
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
          <Heading size='3xl'>Appdeptus</Heading>
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
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  }
})

export default ArmiesScreen
