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

  isValid?: boolean
  variant?: ComponentProps<typeof Card>['variant']
}

const ArmyListItem = ({
  codex,
  detachment,
  name,
  points,

  isValid = true,
  variant
}: ArmyListItemProps) => (
  <Card variant={variant}>
    <ArmyBackground codex={codex} />
    {!isValid ? (
      <Text
        className='rounded-2xl bg-warning-400 px-4 py-1'
        family='body-bold'
        size='sm'
      >
        💀 Army no longer valid!
      </Text>
    ) : null}
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
    {!isValid ? (
      <VStack className='absolute h-full w-full overflow-hidden rounded-3xl border-2 border-warning-400' />
    ) : null}
  </Card>
)

export default memo(ArmyListItem)
