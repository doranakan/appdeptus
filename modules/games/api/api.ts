import { coreApi } from 'appdeptus/api'
import {
  createGame,
  endGame,
  getEndedGameList,
  getGame,
  getNewGame,
  nextTurn,
  startGame,
  updateGameArmy,
  updateScoreAndCP
} from './endpoints'
import { gamesApiTags } from './tags'

const gamesApi = coreApi
  .enhanceEndpoints({
    addTagTypes: gamesApiTags
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createGame: createGame(builder),
      endGame: endGame(builder),
      getEndedGameList: getEndedGameList(builder),
      getGame: getGame(builder),
      getNewGame: getNewGame(builder),
      nextTurn: nextTurn(builder),
      startGame: startGame(builder),
      updateGameArmy: updateGameArmy(builder),
      updateScoreAndCP: updateScoreAndCP(builder)
    }),
    overrideExisting: true
  })

export default gamesApi
