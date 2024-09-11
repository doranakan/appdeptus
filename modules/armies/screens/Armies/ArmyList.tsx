import { ArmyIcon, Button } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
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
      <VStack className='items-center flex-1 justify-center gap-4 p-4'>
        <Text className='text-center'>😱 You have no armies!</Text>
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
      ItemSeparatorComponent={() => <Box className='h-4' />}
      keyExtractor={(item) => item.id}
      ListFooterComponent={() => <Box className='h-8' />}
      renderItem={({ item: army }) => (
        <Pressable
          onPress={() => {
            router.push(`armies/${army.id}`)
          }}
          className='flex-1'
        >
          <VStack className='bg-backgroundLight-100 rounded-2xl flex-1 justify-between p-2'>
            <VStack className='gap-1'>
              <Text bold>{army.name}</Text>
              <HStack className='items-center gap-4'>
                <HStack className='items-center gap-1'>
                  <ArmyIcon
                    color='primary500'
                    codexName={army.codex.name}
                    h={18}
                    w={18}
                  />
                  <Text size='sm'>{army.codex.name}</Text>
                </HStack>
                <HStack className='items-center gap-1'>
                  <Icon
                    as={Blinds}
                    className='h-[18px] w-[18px]'
                  />
                  <Text className='font-bold text-right'>
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
