import { ArmyIcon } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type Army } from 'appdeptus/models'
import { useGetArmiesQuery } from 'appdeptus/modules/armies/api'
import { Swords } from 'lucide-react-native'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ArmySelectorProps = {
  selectedArmy: string | undefined
  onArmySelected: (army: Omit<Army, 'units' | 'detachment'>) => void
}

const ArmySelector = ({ selectedArmy, onArmySelected }: ArmySelectorProps) => {
  const insets = useSafeAreaInsets()

  const { data } = useGetArmiesQuery()

  if (!data) {
    return null
  }

  return (
    <VStack className={` pb-${insets.bottom} `}>
      <HStack className='items-center gap-2 px-4 py-2'>
        <Icon
          as={Swords}
          className='text-secondary-50'
        />
        <Text
          bold
          className='text-secondary-50'
        >
          Select your army:
        </Text>
      </HStack>
      <FlatList
        data={data}
        horizontal
        ItemSeparatorComponent={() => <Box className='w-4' />}
        ListHeaderComponent={() => <Box className='w-4' />}
        ListFooterComponent={() => <Box className='w-4' />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              onArmySelected(item)
            }}
            className='mb-4 w-[150px]'
          >
            <VStack
              className={` ${selectedArmy === item.id ? 'opacity-100' : 'opacity-60'} ${selectedArmy === item.id ? 'bg-secondary-100' : 'bg-secondary-50'} items-center rounded-2xl p-2 `}
            >
              <ArmyIcon
                codexName={item.codex.name}
                h={80}
                w={80}
              />
              <Text
                bold
                ellipsizeMode='tail'
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text>{`${item.totalPoints}pts`}</Text>
            </VStack>
          </Pressable>
        )}
      />
    </VStack>
  )
}

export default ArmySelector
