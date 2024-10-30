import { type SelectableUnit } from 'appdeptus/models'
import {
  Bus,
  Car,
  Crown,
  type LucideIcon,
  Shield,
  UserRound,
  UsersRound
} from 'lucide-react-native'
import { memo } from 'react'
import IconBadge from '../IconBadge'
import Text from '../Text'
import { HStack } from '../ui'

type UnitNameProps = Pick<SelectableUnit, 'name' | 'type'> & {
  warlord?: boolean
}

const UnitName = ({ name, type, warlord }: UnitNameProps) => (
  <HStack
    className='items-center'
    space='md'
  >
    <IconBadge Icon={warlord ? Crown : unitTypeToIcon[type]} />
    <Text family='body-bold'>{name}</Text>
  </HStack>
)

const unitTypeToIcon = {
  character: UserRound,
  leader: Shield,
  squad: UsersRound,
  transport: Bus,
  vehicle: Car
} as const satisfies Record<SelectableUnit['type'], LucideIcon>

export default memo(UnitName)
