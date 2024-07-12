import { type Army } from './army'
import { type UserProfile } from './userProfile'

type BaseGame = {
  id: string
  created: string
  playerOne: Player
}

type ActiveGame = BaseGame & {
  status:
    | 'turn1_p1'
    | 'turn1_p2'
    | 'turn2_p1'
    | 'turn2_p2'
    | 'turn3_p1'
    | 'turn3_p2'
    | 'turn4_p1'
    | 'turn4_p2'
    | 'turn5_p1'
    | 'turn5_p2'
  playerTwo: Player
}

type EndedGame = BaseGame & {
  status: 'ended'
  playerTwo: Player
}

type NewGame = BaseGame & {
  status: 'new'
}

type Player = {
  cp: number
  name: UserProfile['name']
  army: Omit<Army, 'units'>
  score: number
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

export type { ActiveGame, EndedGame, NewGame, Player }
