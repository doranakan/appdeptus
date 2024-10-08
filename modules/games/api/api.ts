import { coreApi } from 'appdeptus/api'
import {
  createGame,
  endGame,
  getGameList,
  getNewGame,
  nextTurn,
  startGame,
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
      getGameList: getGameList(builder),
      getNewGame: getNewGame(builder),
      nextTurn: nextTurn(builder),
      startGame: startGame(builder),
      updateScoreAndCP: updateScoreAndCP(builder)
    }),
    overrideExisting: true
  })

export default gamesApi
