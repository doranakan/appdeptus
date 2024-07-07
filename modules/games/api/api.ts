import { supabaseApi } from 'appdeptus/api'
import { createGame, getGame, getGames } from './endpoints'

const gamesApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: createGame(builder),
    getGame: getGame(builder),
    getGames: getGames(builder)
  }),
  overrideExisting: true
})

export default gamesApi
