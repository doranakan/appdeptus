import {
  Card,
  HStack,
  IconBadge,
  Pressable,
  ScreenContainer,
  Text,
  VStack
} from 'appdeptus/components'
import { type ArmyBuilder, type BattleSize } from 'appdeptus/models'
import { type LucideIcon, Rocket, Sword, Swords } from 'lucide-react-native'
import { useFormContext } from 'react-hook-form'

const BATTLE_SIZES: {
  description: string
  icon: LucideIcon
  label: string
  value: BattleSize
}[] = [
  {
    description: '2 DP',
    icon: Sword,
    label: 'Incursion',
    value: 'incursion'
  },
  {
    description: '3 DP',
    icon: Swords,
    label: 'Strike Force',
    value: 'strike_force'
  },
  {
    description: 'No restrictions',
    icon: Rocket,
    label: 'Unbound',
    value: 'free'
  }
]

const BattleSizeSelection = () => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const battleSize = watch('battleSize')

  return (
    <ScreenContainer
      safeAreaInsets={['bottom']}
      hideBottomGradient
    >
      <VStack
        className='flex-1 px-4 py-4'
        space='md'
      >
        {BATTLE_SIZES.map(({ value, label, description, icon }) => (
          <Pressable
            key={value}
            onPress={() => {
              setValue('battleSize', value)
            }}
          >
            <Card variant={battleSize === value ? 'selected' : 'selectable'}>
              <HStack
                className='items-center justify-between p-4'
                space='md'
              >
                <HStack
                  className='flex-1 items-center'
                  space='md'
                >
                  <IconBadge Icon={icon} />
                  <Text
                    className='line-clamp-1 flex-1'
                    family='body-bold'
                  >
                    {label}
                  </Text>
                </HStack>
                <Text
                  className='uppercase'
                  family='body-bold'
                  size='sm'
                >
                  {description}
                </Text>
              </HStack>
            </Card>
          </Pressable>
        ))}
      </VStack>
    </ScreenContainer>
  )
}

export default BattleSizeSelection
