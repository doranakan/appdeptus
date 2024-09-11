import {
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { ArmyIcon, Button } from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { Link, useRouter } from 'expo-router'
import { Blinds } from 'lucide-react-native'
import { FlatList, StyleSheet } from 'react-native'

type ArmyListProps = {
  armies: Omit<Army, 'units' | 'detachment'>[]
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
        <Link
          asChild
          href='army-builder'
        >
          <Pressable>
            <Button text='Create your first army' />
          </Pressable>
        </Link>
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
          flex={1}
          onPress={() => {
            router.push(`armies/${army.id}`)
          }}
        >
          <VStack
            bg='$backgroundLight100'
            borderRadius='$2xl'
            flex={1}
            justifyContent='space-between'
            p='$2'
          >
            <VStack gap='$1'>
              <Text bold>{army.name}</Text>
              <HStack
                alignItems='center'
                gap='$4'
              >
                <HStack
                  alignItems='center'
                  gap='$1'
                >
                  <ArmyIcon
                    color='primary500'
                    codexName={army.codex.name}
                    h={18}
                    w={18}
                  />
                  <Text size='sm'>{army.codex.name}</Text>
                </HStack>
                <HStack
                  alignItems='center'
                  gap='$1'
                >
                  <Icon
                    as={Blinds}
                    h={18}
                    w={18}
                  />
                  <Text
                    fontWeight='bold'
                    textAlign='right'
                  >
                    {army.totalPoints} points
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </VStack>
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
