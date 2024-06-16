import {
  Badge,
  Box,
  HStack,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import { FlatList, StyleSheet } from 'react-native'

type ArmyListProps = {
  armies: Omit<Army, 'units'>[]
}

const ArmyList = ({ armies }: ArmyListProps) => {
  const router = useRouter()

  if (!armies.length) {
    return (
      <VStack
        alignItems='center'
        flex={1}
        justifyContent='center'
        gap={'$4'}
        p='$4'
      >
        <Text textAlign='center'>😱 You have no armies!</Text>
        <Button
          onPress={() => {
            router.push('armies/army-builder/codex-selection')
          }}
          text='Create your first army'
        />
      </VStack>
    )
  }

  return (
    <FlatList
      data={armies}
      ItemSeparatorComponent={() => <Box height='$4' />}
      keyExtractor={(item) => item.id}
      ListFooterComponent={() => <Box height='$8' />}
      renderItem={({ item: army }) => (
        <Pressable
          backgroundColor='$backgroundLight0'
          flex={1}
          onPress={() => {
            router.push(`armies/${army.id}`)
          }}
          p='$4'
        >
          <HStack
            flex={1}
            justifyContent='space-between'
          >
            <VStack gap='$1'>
              <Text fontWeight='bold'>{army.name}</Text>
              <Badge
                backgroundColor='$primary50'
                borderColor='$primary200'
                variant='outline'
              >
                <Text size='sm'>{`Codex ${army.codex.name}`}</Text>
              </Badge>
            </VStack>
            <Text
              fontWeight='bold'
              textAlign='right'
            >
              {army.totalPoints} points
            </Text>
          </HStack>
        </Pressable>
      )}
      style={styles.flex1}
    />
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  }
})

export default ArmyList
