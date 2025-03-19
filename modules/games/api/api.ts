import { coreApi } from 'appdeptus/api'
import {
  createGame,
  endGame,
  getEndedGameList,
  getGame,
  getNewGame,
  goToLobby,
  nextTurn,
  setFirstPlayer,
  setReadyPlayer,
  startGame,
  updateGameArmy,
  updateScoreAndCP
} from './endpoints'
import setRankedGame from './endpoints/setRankedGame'
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
      goToLobby: goToLobby(builder),
      nextTurn: nextTurn(builder),
      startGame: startGame(builder),
      setFirstPlayer: setFirstPlayer(builder),
      setRankedGame: setRankedGame(builder),
      setReadyPlayer: setReadyPlayer(builder),
      updateGameArmy: updateGameArmy(builder),
      updateScoreAndCP: updateScoreAndCP(builder)
    }),
    overrideExisting: true
  })

export default gamesApi
