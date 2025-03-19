import { type Army, type GameArmy } from './army'
import { type Community } from './community'
import { type UserProfile } from './userProfile'

type BaseGame = {
  id: number
  lastUpdate: string
  playerOne: Player
  round: 1 | 2 | 3 | 4 | 5
  turn: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  community?: Omit<Community, 'members'>
}

type ActiveGame = BaseGame & {
  status: 'in_lobby' | 'active'
  playerTwo: Player
}

type EndedGame = BaseGame & {
  status: 'ended'
  playerTwo: Player
}

type CreateGame = {
  playerOne: BasePlayer & {
    army: Omit<Army, 'user'>
  }
}

type NewGame = BaseGame & {
  status: 'new'
}

type BasePlayer = {
  cp: number
  profile: UserProfile
  score: number
}

type Player = BasePlayer & {
  army: GameArmy
  isReady: boolean
  isActive: boolean
}

const isActiveGame = (
  game: ActiveGame | EndedGame | NewGame
): game is ActiveGame => game.status !== 'new' && game.status !== 'ended'

const isEndedGame = (
  game: ActiveGame | EndedGame | NewGame
): game is EndedGame => game.status === 'ended'

const isNewGame = (game: ActiveGame | EndedGame | NewGame): game is NewGame =>
  game.status === 'new'

export { isActiveGame, isEndedGame, isNewGame }

export type { ActiveGame, CreateGame, EndedGame, NewGame, Player }
