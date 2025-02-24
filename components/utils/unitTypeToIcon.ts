import { type SelectableUnit } from 'appdeptus/models'
import {
  Anvil,
  Bus,
  Shield,
  UserRound,
  UsersRound,
  type LucideIcon
} from 'lucide-react-native'

const unitTypeToIcon = {
  character: UserRound,
  leader: Shield,
  squad: UsersRound,
  transport: Bus,
  vehicle: Anvil
} as const satisfies Record<SelectableUnit['type'], LucideIcon>

export default unitTypeToIcon
