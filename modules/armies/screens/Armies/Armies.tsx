import { Box, HStack, Text } from '@gluestack-ui/themed'
import { Button, Loading } from 'appdeptus/components'
import { useRouter } from 'expo-router'
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
          <Text
            fontWeight='$bold'
            size='3xl'
          >
            Appdeptus
          </Text>
          <Button
            iconColor='$primary500'
            iconName='plus-circle'
            onPress={() => {
              router.push('armies/army-builder/codex-selection')
            }}
            size='xl'
            variant='link'
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
