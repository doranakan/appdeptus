import { type SelectableUnit, type Team, type Unit } from 'appdeptus/models'
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
import Card from '../Card'
import IconBadge from '../IconBadge'
import Text from '../Text'
import { HStack, Icon, VStack } from '../ui'

type UnitListItemProps = {
  unitOrTeam: Unit | Team

  warlord?: boolean
}

const UnitListItem = ({ unitOrTeam, ...props }: UnitListItemProps) => {
  if ('leader' in unitOrTeam) {
    return (
      <Card>
        <VStack className='p-4'>
          <UnitDetail
            unit={unitOrTeam.leader}
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
            unit={unitOrTeam.bodyguard}
            warlord={false}
          />
        </VStack>
      </Card>
    )
  }

  return (
    <Card>
      <VStack className='p-4'>
        <UnitDetail
          unit={unitOrTeam}
          {...props}
        />
      </VStack>
    </Card>
  )
}

type UnitDetailProps = {
  unit: Unit
} & Omit<UnitListItemProps, 'unitOrTeam'>

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

export default UnitListItem
