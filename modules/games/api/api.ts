import { supabaseApi } from 'appdeptus/api'
import { createGame } from './endpoints'
import getGames from './endpoints/getGames'

const gamesApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: createGame(builder),
    getGames: getGames(builder)
  }),
  overrideExisting: true
})

export default gamesApi
