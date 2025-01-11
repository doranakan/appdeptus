import {
  type Army,
  type GameArmy,
  type GameTeam,
  type GameUnit,
  type SelectableUnit,
  type Team,
  type Unit
} from 'appdeptus/models'
import {
  Bus,
  Car,
  CircleFadingPlus,
  Crown,
  Link,
  type LucideIcon,
  Shield,
  UserRound,
  UsersRound
} from 'lucide-react-native'
import pluralize from 'pluralize'
import {
  type ComponentProps,
  memo,
  type PropsWithChildren,
  useMemo
} from 'react'
import Card from '../Card'
import IconBadge from '../IconBadge'
import InnerBorder from '../InnerBorder'
import InsetShadow from '../InsetShadow'
import Text from '../Text'
import { HStack, Icon, VStack } from '../ui'

type UnitListItemProps = {
  item: Army['roster'][number] | GameArmy['roster'][number]

  variant?: ComponentProps<typeof Card>['variant']
}

const UnitListItem = ({ item, variant = 'default' }: UnitListItemProps) => {
  switch (item.type) {
    case 'embarked':
      return (
        <Card variant={variant}>
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
        <Card variant={variant}>
          <VStack className='p-4'>
            <TeamDetail team={item} />
          </VStack>
        </Card>
      )

    default:
      return (
        <Card variant={variant}>
          <VStack className='p-4'>
            <UnitDetail unit={item} />
          </VStack>
        </Card>
      )
  }
}

type UnitDetailProps = {
  unit: Unit | GameUnit
} & Omit<UnitListItemProps, 'item'>

const UnitDetail = ({ unit }: UnitDetailProps) => {
  const count = useMemo(() => {
    if ('models' in unit) {
      return unit.models.length
    }

    return unit.tier.models
  }, [unit])

  const points = useMemo(() => {
    if ('points' in unit) {
      return unit.points
    }

    return unit.tier.points
  }, [unit])

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
          <Text size='sm'>{`${count} ${pluralize('model', count)}`}</Text>
          {/* This stupid workaround is required since on iOS the dotted border is support only on all sides */}
          <VStack className='flex-1 overflow-hidden'>
            <VStack className='m-[-3] mb-[4] flex-1 border-2 border-dotted border-primary-50' />
          </VStack>
          <Text
            className='uppercase'
            family='body-bold'
            size='sm'
          >{`${points + ('enhancement' in unit ? (unit.enhancement?.points ?? 0) : 0)}pts`}</Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

type TeamDetailProps = {
  team: Team | GameTeam
}

const TeamDetail = ({ team }: TeamDetailProps) => (
  <VStack space='sm'>
    <UnitDetail unit={team.leader} />
    <Icon
      as={Link}
      className='px-4 color-primary-50'
      size='md'
    />
    <UnitDetail unit={team.bodyguard} />
  </VStack>
)

const EmbarkedUnit = ({ children }: PropsWithChildren) => (
  <InnerBorder rounded='2xl'>
    <InsetShadow>
      <VStack className='rounded-2xl bg-primary-800 p-4'>{children}</VStack>
    </InsetShadow>
  </InnerBorder>
)

const unitTypeToIcon = {
  character: UserRound,
  leader: Shield,
  squad: UsersRound,
  transport: Bus,
  vehicle: Car
} as const satisfies Record<SelectableUnit['type'], LucideIcon>

export default memo(UnitListItem)
