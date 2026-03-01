import { type Codex } from './codex'
import { type Community } from './community'
import { type UserProfile } from './userProfile'

type TournamentFormat = 'single_elimination' | 'swiss'

type TournamentStatus = 'open' | 'ready' | 'started' | 'ended'

type TournamentRoundStatus = 'pending' | 'active' | 'completed'

type TournamentMatchMode = 'full' | 'light'

type TournamentMatchStatus = 'pending' | 'reported' | 'confirmed'

type Tournament = {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  address: string
  date: string
  format: TournamentFormat
  status: TournamentStatus
  pointsLimit?: number
  price?: number
  description?: string
  registrationDeadline?: string
  organizer: UserProfile
  community?: Omit<Community, 'members'>
}

type TournamentArmy = {
  id: number
  name: string
  points: number
  codex: Pick<Codex, 'id' | 'name' | 'faction'>
}

type TournamentRegistration = {
  id: number
  createdAt: string
  tournament: number
  user: UserProfile
  army: TournamentArmy
}

type TournamentRound = {
  id: number
  createdAt: string
  tournament: number
  roundNumber: number
  status: TournamentRoundStatus
}

type TournamentMatch = {
  id: number
  createdAt: string
  updatedAt: string
  round: number
  playerOne: UserProfile
  playerTwo: UserProfile
  playerOneScore?: number
  playerTwoScore?: number
  winner?: UserProfile
  mode?: TournamentMatchMode
  status: TournamentMatchStatus
  game?: number
}

type CreateTournament = {
  name: string
  address: string
  date: string
  format: TournamentFormat
  pointsLimit?: number
  price?: number
  description?: string
  registrationDeadline?: string
  communityId?: number
}

export type {
  CreateTournament,
  Tournament,
  TournamentArmy,
  TournamentFormat,
  TournamentMatch,
  TournamentMatchMode,
  TournamentMatchStatus,
  TournamentRegistration,
  TournamentRound,
  TournamentRoundStatus,
  TournamentStatus
}
