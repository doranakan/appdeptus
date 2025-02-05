import { type Army, type Team, type Unit } from 'appdeptus/models'
import { CircleFadingPlus, Crown } from 'lucide-react-native'
import pluralize from 'pluralize'
import { type ComponentProps, memo } from 'react'
import Card from '../Card'
import Dots from '../Dots'
import IconBadge from '../IconBadge'
import Text from '../Text'
import { HStack, VStack } from '../ui'
import { unitTypeToIcon } from '../utils'
import EmbarkedUnit from './EmbarkedUnit'
import TeamUnit from './TeamUnit'

type UnitListItemProps = {
  item: Army['roster'][number]

  isValid?: boolean
  variant?: ComponentProps<typeof Card>['variant']
}

const UnitListItem = ({
  item,
  isValid = true,
  variant = 'default'
}: UnitListItemProps) => {
  const cardVariant = isValid ? variant : 'disabled'

  switch (item.type) {
    case 'embarked':
      return (
        <Card variant={cardVariant}>
          <VStack
            className='p-4'
            space='md'
          >
            {item.crew.map((unit) => {
              if (unit.type === 'team') {
                return (
                  <EmbarkedUnit key={unit.id}>
                    <TeamDetail team={unit} />
                  </EmbarkedUnit>
                )
              }
              return (
                <EmbarkedUnit key={unit.selectionId}>
                  <UnitDetail unit={unit} />
                </EmbarkedUnit>
              )
            })}
            <UnitDetail unit={item.transport} />
          </VStack>
        </Card>
      )
    case 'team':
      return (
        <Card variant={cardVariant}>
          <VStack className='p-4'>
            <TeamDetail team={item} />
          </VStack>
        </Card>
      )

    default:
      return (
        <Card variant={cardVariant}>
          <VStack className='p-4'>
            <UnitDetail unit={item} />
          </VStack>
        </Card>
      )
  }
}

type UnitDetailProps = {
  unit: Unit
} & Omit<UnitListItemProps, 'item'>

const UnitDetail = ({ unit }: UnitDetailProps) => {
  return (
    <HStack
      className='items-center'
      space='md'
    >
      <IconBadge
        Icon={unit.warlord ? Crown : unitTypeToIcon[unit.type]}
        OptionIcon={
          'enhancement' in unit && unit.enhancement
            ? CircleFadingPlus
            : undefined
        }
      />
      <VStack className='flex-1'>
        <Text
          family='body-bold'
          className='line-clamp-1'
        >
          {unit.name}
        </Text>
        {'enhancement' in unit && unit.enhancement ? (
          <Text
            className='line-clamp-1'
            family='body-bold-italic'
            size='sm'
          >
            {unit.enhancement.name}
          </Text>
        ) : null}
        <HStack space='sm'>
          <Text size='sm'>{`${unit.tier.models} ${pluralize('model', unit.tier.models)}`}</Text>
          <Dots />
          <Text
            className='uppercase'
            family='body-bold'
            size='sm'
          >{`${unit.tier.points + ('enhancement' in unit ? (unit.enhancement?.points ?? 0) : 0)}pts`}</Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

type TeamDetailProps = {
  team: Team
}

const TeamDetail = ({ team }: TeamDetailProps) => (
  <TeamUnit
    BodyGuard={<UnitDetail unit={team.bodyguard} />}
    Leader={<UnitDetail unit={team.leader} />}
  />
)

export default memo(UnitListItem)
