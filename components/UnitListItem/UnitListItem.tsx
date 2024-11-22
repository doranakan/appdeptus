import {
  type Embarked,
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
import { type ComponentProps, memo } from 'react'
import Card from '../Card'
import IconBadge from '../IconBadge'
import Text from '../Text'
import { HStack, Icon, VStack } from '../ui'

type UnitListItemProps = {
  item: Unit | Team | Embarked

  variant?: ComponentProps<typeof Card>['variant']
}

const UnitListItem = ({ item, variant = 'default' }: UnitListItemProps) => {
  switch (item.type) {
    case 'embarked':
      return null
    case 'team':
      return (
        <Card variant={variant}>
          <VStack className='p-4'>
            <UnitDetail unit={item.leader} />
            <VStack className='p-2'>
              <Icon
                as={Link}
                className='color-primary-50'
                size='md'
              />
            </VStack>
            <UnitDetail unit={item.bodyguard} />
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
  unit: Unit
} & Omit<UnitListItemProps, 'item'>

const UnitDetail = ({ unit }: UnitDetailProps) => (
  <HStack
    className='items-center'
    space='md'
  >
    <IconBadge
      Icon={unit.warlord ? Crown : unitTypeToIcon[unit.type]}
      OptionIcon={
        'enhancement' in unit && unit.enhancement ? CircleFadingPlus : undefined
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
        {/* This stupid workaround is required since on iOS the dotted border is support only on all sides */}
        <VStack className='flex-1 overflow-hidden'>
          <VStack className='m-[-3] mb-[4] flex-1 border-2 border-dotted border-primary-50' />
        </VStack>
        <Text
          className='uppercase'
          family='body-bold'
          size='sm'
        >{`${unit.tier.points + ('enhancement' in unit ? (unit.enhancement?.points ?? 0) : 0)}pts`}</Text>
      </HStack>
    </VStack>
  </HStack>
)

const unitTypeToIcon = {
  character: UserRound,
  leader: Shield,
  squad: UsersRound,
  transport: Bus,
  vehicle: Car
} as const satisfies Record<SelectableUnit['type'], LucideIcon>

export default memo(UnitListItem)
