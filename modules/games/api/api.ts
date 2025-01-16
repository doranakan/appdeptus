import { coreApi } from 'appdeptus/api'
import {
  createGame,
  deleteGame,
  endGame,
  getEndedGameList,
  getGame,
  getNewGame,
  nextTurn,
  startGame,
  updateGameArmy,
  updateScoreAndCP
} from './endpoints'
import GamesApiTag from './tags'

const gamesApi = coreApi
  .enhanceEndpoints({
    addTagTypes: Object.values(GamesApiTag)
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createGame: createGame(builder),
      endGame: endGame(builder),
      deleteGame: deleteGame(builder),
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
