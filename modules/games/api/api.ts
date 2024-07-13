import { supabaseApi } from 'appdeptus/api'
import { createGame, getGame, getGames, startGame } from './endpoints'
import nextTurn from './endpoints/nextTurn'
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
      nextTurn: nextTurn(builder),
      startGame: startGame(builder)
    }),
    overrideExisting: true
  })

export default gamesApi
