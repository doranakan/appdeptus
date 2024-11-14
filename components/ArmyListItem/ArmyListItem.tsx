import { type CodexName } from 'appdeptus/models'

import { memo, type ComponentProps } from 'react'
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
    <ArmyBackground codex={codex} />
    <VStack
      className='p-4'
      space='sm'
    >
      <HStack className='items-center justify-between'>
        <Text
          className='uppercase'
          family='body-bold'
          size='lg'
        >
          {codex}
        </Text>
        <Text
          className='uppercase'
          family='body-bold'
          size='lg'
        >
          {`${points}pts`}
        </Text>
      </HStack>
      <HStack className='items-center justify-between'>
        <Text>{name}</Text>
        <Badge
          codex={codex}
          text={detachment}
        />
      </HStack>
    </VStack>
  </Card>
)

export default memo(ArmyListItem)
