import { Card, HStack, IconBadge, Text } from 'appdeptus/components'
import { type ArmyBuilder, type BattleSize } from 'appdeptus/models'
import { type LucideIcon, Rocket, Sword, Swords } from 'lucide-react-native'
import { useFormContext } from 'react-hook-form'
import { Pressable } from 'react-native'

const BATTLE_SIZES = [
  {
    description: '1000PTS | 2DP',
    icon: Sword,
    label: 'Incursion',
    value: 'incursion'
  },
  {
    description: '2000PTS | 3DP',
    icon: Swords,
    label: 'Strike Force',
    value: 'strike-force'
  },
  {
    description: 'No restrictions',
    icon: Rocket,
    label: 'Unbound',
    value: 'free'
  }
] as const satisfies {
  description: string
  icon: LucideIcon
  label: string
  value: BattleSize
}[]

const BattleSizeList = () => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const battleSize = watch('battleSize')

  return (
    <>
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
    </>
  )
}

export default BattleSizeList
