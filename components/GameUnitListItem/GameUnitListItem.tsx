import { useModelsLeft, useTotalWounds } from 'appdeptus/hooks'
import {
  type GameArmy,
  type GameTeam,
  type GameUnit,
  type SelectableUnit
} from 'appdeptus/models'
import {
  Bus,
  Car,
  CircleFadingPlus,
  Crown,
  Droplets,
  Link,
  type LucideIcon,
  Shield,
  Skull,
  UserRound,
  UsersRound
} from 'lucide-react-native'
import pluralize from 'pluralize'
import { memo, type PropsWithChildren } from 'react'
import Card from '../Card'
import IconBadge from '../IconBadge'
import InnerBorder from '../InnerBorder'
import InsetShadow from '../InsetShadow'
import Text from '../Text'
import { HStack, Icon, VStack } from '../ui'

type UnitListItemProps = {
  item: GameArmy['roster'][number]
}

const UnitListItem = ({ item }: UnitListItemProps) => {
  const modelsLeft = useModelsLeft(item)

  switch (item.type) {
    case 'embarked':
      return (
        <Card variant={!modelsLeft ? 'selectable-alt' : 'default'}>
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
        <Card variant={!modelsLeft ? 'selectable-alt' : 'default'}>
          <VStack className='p-4'>
            <TeamDetail team={item} />
          </VStack>
        </Card>
      )

    default:
      return (
        <Card variant={!modelsLeft ? 'selectable-alt' : 'default'}>
          <VStack className='p-4'>
            <UnitDetail unit={item} />
          </VStack>
        </Card>
      )
  }
}

type UnitDetailProps = {
  unit: GameUnit
} & Omit<UnitListItemProps, 'item'>

const UnitDetail = ({ unit }: UnitDetailProps) => {
  const modelsLeft = useModelsLeft(unit)
  const totalWounds = useTotalWounds(unit)

  return (
    <HStack
      className='items-center'
      space='md'
    >
      <IconBadge
        Icon={
          !modelsLeft ? Skull : unit.warlord ? Crown : unitTypeToIcon[unit.type]
        }
        OptionIcon={
          totalWounds && modelsLeft
            ? Droplets
            : 'enhancement' in unit && unit.enhancement
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
          <Text size='sm'>{`${modelsLeft}/${unit.models.length} ${pluralize('model', unit.models.length)}`}</Text>
          {/* This stupid workaround is required since on iOS the dotted border is support only on all sides */}
          <VStack className='flex-1 overflow-hidden'>
            <VStack className='m-[-3] mb-[4] flex-1 border-2 border-dotted border-primary-50' />
          </VStack>
          <Text
            className='uppercase'
            family='body-bold'
            size='sm'
          >{`${unit.points + ('enhancement' in unit ? (unit.enhancement?.points ?? 0) : 0)}pts`}</Text>
        </HStack>
      </VStack>
    </HStack>
  )
}

type TeamDetailProps = {
  team: GameTeam
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
