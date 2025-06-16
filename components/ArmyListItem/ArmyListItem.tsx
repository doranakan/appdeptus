import { type CodexName, type UserProfile } from 'appdeptus/models'

import { LinearGradient } from 'expo-linear-gradient'
import { memo, type ComponentProps } from 'react'
import ArmyBackground from '../ArmyBackground'
import Badge from '../Badge'
import Card from '../Card'
import PlayerTag from '../PlayerTag'
import Text from '../Text'
import { HStack, themeColors, VStack } from '../ui'

type ArmyListItemProps = {
  codex: CodexName
  detachment: string
  name: string
  points: number

  shareBy?: UserProfile
  isValid?: boolean
  variant?: ComponentProps<typeof Card>['variant']
}

const ArmyListItem = ({
  codex,
  detachment,
  name,
  points,

  isValid = true,
  shareBy,
  variant
}: ArmyListItemProps) => (
  <Card variant={variant}>
    <VStack className='bg-primary-950 shadow-md'>
      <HStack className='absolute h-full w-full'>
        <ArmyBackground codex={codex} />

        <LinearGradient
          colors={[
            themeColors[codex].primary[800],
            `${themeColors[codex].primary[800]}00`
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: '50%',
            height: '100%',
            position: 'absolute',
            left: 0
          }}
        />
        <LinearGradient
          colors={[
            themeColors[codex].primary[800],
            `${themeColors[codex].primary[800]}00`
          ]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            width: '50%',
            height: '100%',
            position: 'absolute',
            right: 0
          }}
        />
      </HStack>
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
    </VStack>
    {shareBy ? (
      <HStack className='items-center justify-between bg-primary-950/80 px-4 py-2'>
        <Text size='sm'>Shared by:</Text>
        <PlayerTag
          player={shareBy}
          reversed
        />
      </HStack>
    ) : null}
    {!isValid ? (
      <VStack className='absolute h-full w-full overflow-hidden rounded-3xl border-2 border-warning-400' />
    ) : null}
  </Card>
)

export default memo(ArmyListItem)
