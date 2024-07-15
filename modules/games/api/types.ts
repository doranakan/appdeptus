import { type ActiveGame } from 'appdeptus/models/game'

type RealTimeGame = {
  army_one: number
  army_two: number
  cp_one: number
  cp_two: number
  created_at: string
  id: number
  player_one: string
  player_two: string
  score_one: number
  score_two: number
  status: ActiveGame['status']
}

export type { RealTimeGame }
