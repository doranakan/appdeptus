import gamesApi from '../api'

const {
  useCreateGameMutation,
  useEndGameMutation,
  useGetEndedGameListQuery,
  useGetNewGameQuery,
  useGetGameQuery,
  useGoToLobbyMutation,
  useLazyGetGameQuery,
  useNextTurnMutation,
  useStartGameMutation,
  useSetFirstPlayerMutation,
  useSetRankedGameMutation,
  useSetReadyPlayerMutation,
  useUpdateGameArmyMutation,
  useUpdateScoreAndCPMutation
} = gamesApi

export {
  useCreateGameMutation,
  useEndGameMutation,
  useGetEndedGameListQuery,
  useGetGameQuery,
  useGetNewGameQuery,
  useGoToLobbyMutation,
  useLazyGetGameQuery,
  useNextTurnMutation,
  useSetFirstPlayerMutation,
  useSetRankedGameMutation,
  useSetReadyPlayerMutation,
  useStartGameMutation,
  useUpdateGameArmyMutation,
  useUpdateScoreAndCPMutation
}

export { default as useGameArmyUpdateListener } from './useGameArmyUpdateListener'
export { default as useGameArmyUpdates } from './useGameArmyUpdates'
export { default as useGameUpdateListener } from './useGameUpdateListener'
export { default as useGameUpdates } from './useGameUpdates'
