import { type CodexName } from 'appdeptus/models'

import { type ComponentProps } from 'react'
import ArmyBackground from '../ArmyBackground'
import Badge from '../Badge'
import Card from '../Card'
import Text from '../Text'
import { HStack, VStack } from '../ui'

type ArmyListItemProps = {
  codex: CodexName
  detachment: string
  name: string
  points: number
  variant?: ComponentProps<typeof Card>['variant']
}

const ArmyListItem = ({
  codex,
  detachment,
  name,
  points,
  variant
}: ArmyListItemProps) => (
  <Card variant={variant}>
    <ArmyBackground
      codex={codex}
      opacity={variant === 'selected' ? 'opacity-60' : undefined}
    />
    <VStack
      className='p-4'
      space='sm'
    >
      <HStack className='items-center justify-between'>
        <Text
          className='uppercase text-typography-50'
          family='body-bold'
          size='lg'
        >
          {codex}
        </Text>
        <Text
          className='uppercase text-typography-50'
          family='body-bold'
          size='lg'
        >
          {`${points} pts`}
        </Text>
      </HStack>
      <HStack className='items-center justify-between'>
        <Text className='text-typography-50'>{name}</Text>
        <Badge
          codex={codex}
          text={detachment}
        />
      </HStack>
    </VStack>
  </Card>
)

export default ArmyListItem
