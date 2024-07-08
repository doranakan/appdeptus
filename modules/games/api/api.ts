import { supabaseApi } from 'appdeptus/api'
import { createGame, getGame, getGames, startGame } from './endpoints'

const gamesApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: createGame(builder),
    getGame: getGame(builder),
    getGames: getGames(builder),
    startGame: startGame(builder)
  }),
  overrideExisting: true
})

export default gamesApi
