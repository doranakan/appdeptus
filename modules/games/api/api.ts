import { supabaseApi } from 'appdeptus/api'
import { createGame, getGame, getGames, startGame } from './endpoints'
import GamesApiTag from './tags'

const gamesApi = supabaseApi
  .enhanceEndpoints({
    addTagTypes: Object.values(GamesApiTag)
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createGame: createGame(builder),
      getGame: getGame(builder),
      getGames: getGames(builder),
      startGame: startGame(builder)
    }),
    overrideExisting: true
  })

export default gamesApi
