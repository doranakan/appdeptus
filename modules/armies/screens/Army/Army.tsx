import { Badge, Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { CodexLogo, Loading } from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, StyleSheet } from 'react-native'
import { useGetArmyQuery } from '../../api'

const ArmyScreen = () => {
  const { armyId } = useLocalSearchParams<{ armyId: string }>()

  const { data: army } = useGetArmyQuery(armyId ?? skipToken)

  if (!army) {
    return <Loading />
  }

  return (
    <FlatList
      data={army.units}
      ItemSeparatorComponent={() => <Box h='$4' />}
      keyExtractor={({ id }, index) => `${id}-${index}`}
      ListHeaderComponent={() => (
        <VStack
          alignItems='center'
          backgroundColor='$backgroundLight0'
          borderRadius='$lg'
          mb='$4'
          p='$4'
        >
          <CodexLogo
            codexId={army.codex.id}
            height={80}
            width={80}
          />
          <VStack>
            <Badge
              borderRadius='$md'
              variant='outline'
            >
              <Text size='sm'>{`Codex ${army.codex.name}`}</Text>
            </Badge>
            <Text
              fontWeight='bold'
              size='2xl'
              textAlign='center'
            >
              {army.name}
            </Text>
            <Text textAlign='center'>
              <Text fontWeight='bold'>{army.totalPoints} </Text>
              points
            </Text>
          </VStack>
        </VStack>
      )}
      ListFooterComponent={() => <Box height='$8' />}
      renderItem={({ item: unit }) => (
        <HStack
          backgroundColor='$backgroundLight0'
          borderRadius='$lg'
          p='$4'
        >
          <Box flex={1}>
            <Text>
              <Text fontWeight='$black'>{unit.name}</Text>
            </Text>
            {unit.caption && <Text fontSize='$sm'>{unit.caption}</Text>}
          </Box>
          <Text fontWeight='bold'>
            {unit.tier.points} <Text>points</Text>
          </Text>
        </HStack>
      )}
      style={styles.flatList}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    padding: 16
  }
})

export default ArmyScreen
