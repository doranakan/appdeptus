import {
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { ArmyIcon, Card } from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useGetArmiesQuery } from 'appdeptus/modules/armies/api'
import { Swords } from 'lucide-react-native'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ArmySelectorProps = {
  selectedArmy: string | undefined
  onArmySelected: (army: Omit<Army, 'units'>) => void
}

const ArmySelector = ({ selectedArmy, onArmySelected }: ArmySelectorProps) => {
  const insets = useSafeAreaInsets()

  const { data } = useGetArmiesQuery()

  if (!data) {
    return null
  }

  return (
    <VStack pb={insets.bottom}>
      <HStack
        alignItems='center'
        gap='$2'
        px='$4'
        py='$2'
      >
        <Icon
          as={Swords}
          color='$secondary50'
        />
        <Heading color='$secondary50'>Select your army:</Heading>
      </HStack>
      <FlatList
        data={data}
        horizontal
        ItemSeparatorComponent={() => <Box w='$4' />}
        ListHeaderComponent={() => <Box w='$4' />}
        ListFooterComponent={() => <Box w='$4' />}
        renderItem={({ item }) => (
          <Pressable
            mb='$4'
            onPress={() => {
              onArmySelected(item)
            }}
            w={150}
          >
            <Card
              alignItems='center'
              gradient={selectedArmy === item.id ? 'primary' : 'secondary'}
              bg={selectedArmy === item.id ? '$primary50' : '$white'}
            >
              <ArmyIcon
                codexName={item.codex.name}
                h={80}
                w={80}
              />
              <Heading
                ellipsizeMode='tail'
                numberOfLines={1}
              >
                {item.name}
              </Heading>
              <Text>{`${item.totalPoints}pts`}</Text>
            </Card>
          </Pressable>
        )}
      />
    </VStack>
  )
}

export default ArmySelector
