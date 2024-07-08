import { type GameStatus } from 'appdeptus/models/game'

type RealTimeGame = {
  army_one: number
  army_two: number
  created_at: string
  id: number
  player_one: string
  player_two: string
  score_one: number
  score_two: number
  status: GameStatus
}

export type { RealTimeGame }
