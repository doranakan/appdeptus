import { type SelectableUnit } from 'appdeptus/models'
import {
  Bus,
  Car,
  Shield,
  UserRound,
  UsersRound,
  VenetianMask,
  type LucideIcon
} from 'lucide-react-native'

const unitTypeToIcon = {
  character: UserRound,
  leader: Shield,
  monster: VenetianMask,
  squad: UsersRound,
  transport: Bus,
  vehicle: Car
} as const satisfies Record<SelectableUnit['type'], LucideIcon>

export default unitTypeToIcon
