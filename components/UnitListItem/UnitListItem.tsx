import {
  type Carried,
  type SelectableUnit,
  type Team,
  type Unit
} from 'appdeptus/models'
import {
  Bus,
  Car,
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
  item: Unit | Team | Carried

  variant?: ComponentProps<typeof Card>['variant']
  warlord?: boolean
}

const UnitListItem = ({
  item,
  variant = 'default',
  ...props
}: UnitListItemProps) => {
  switch (item.type) {
    case 'carried':
      return null
    case 'team':
      return (
        <Card variant={variant}>
          <VStack className='p-4'>
            <UnitDetail
              unit={item.leader}
              {...props}
            />
            <VStack className='p-2'>
              <Icon
                as={Link}
                className='color-primary-50'
                size='md'
              />
            </VStack>
            <UnitDetail
              {...props}
              unit={item.bodyguard}
              warlord={false}
            />
          </VStack>
        </Card>
      )

    default:
      return (
        <Card variant={variant}>
          <VStack className='p-4'>
            <UnitDetail
              unit={item}
              {...props}
            />
          </VStack>
        </Card>
      )
  }
}

type UnitDetailProps = {
  unit: Unit
} & Omit<UnitListItemProps, 'item'>

const UnitDetail = ({ unit, warlord }: UnitDetailProps) => (
  <HStack
    className='items-center'
    space='md'
  >
    <IconBadge Icon={warlord ? Crown : unitTypeToIcon[unit.type]} />
    <VStack className='flex-1'>
      <Text
        family='body-bold'
        className='line-clamp-1'
      >
        {unit.name}
      </Text>
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
        >{`${unit.tier.points}pts`}</Text>
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
