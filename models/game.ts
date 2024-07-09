import { type Army } from './army'
import { type UserProfile } from './userProfile'

enum GameStatus {
  NEW = 'new',
  READY = 'ready',
  TURN_1 = 'turn 1',
  TURN_2 = 'turn 2',
  TURN_3 = 'turn 3',
  TURN_4 = 'turn 4',
  TURN_5 = 'turn 5',
  ENDED = 'ended'
}

type BaseGame = {
  id: string
  created: string
  playerOne: Player
}

type NewGame = BaseGame & {
  status: GameStatus.NEW
}

type Game = BaseGame & {
  status:
    | GameStatus.READY
    | GameStatus.TURN_1
    | GameStatus.TURN_2
    | GameStatus.TURN_3
    | GameStatus.TURN_4
    | GameStatus.TURN_5
    | GameStatus.ENDED
  playerTwo: Player
}

type Player = {
  name: UserProfile['name']
  army: Omit<Army, 'units'>
  score: number
}

export { GameStatus }

export type { Game, NewGame, Player }
