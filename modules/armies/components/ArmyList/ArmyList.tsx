import {
  Badge,
  Box,
  HStack,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { Army } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import { FlatList, StyleSheet } from 'react-native'

type ArmyListProps = {
  armies: Omit<Army, 'units'>[]
}

const ArmyList = ({ armies }: ArmyListProps) => {
  const router = useRouter()

  return (
    <FlatList
      data={armies}
      ItemSeparatorComponent={() => <Box height='$4' />}
      keyExtractor={(item) => item.id}
      renderItem={({ item: army }) => (
        <Pressable
          backgroundColor='$backgroundLight0'
          borderRadius='$lg'
          flex={1}
          onPress={() =>
            router.push({
              params: {
                armyId: army.id
              },
              pathname: './army'
            })
          }
          p='$4'
        >
          <HStack
            flex={1}
            justifyContent='space-between'
          >
            <VStack gap='$1'>
              <Text fontWeight='bold'>{army.name}</Text>
              <Badge
                borderRadius='$md'
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
