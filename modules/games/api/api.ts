import { supabaseApi } from 'appdeptus/api'
import { createGame } from './endpoints'

const gamesApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: createGame(builder)
  }),
  overrideExisting: true
})

export default gamesApi
