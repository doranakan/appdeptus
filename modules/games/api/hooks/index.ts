import gamesApi from '../api'

const {
  useCreateGameMutation,
  useEndGameMutation,
  useGetEndedGameListQuery,
  useGetNewGameQuery,
  useGetGameQuery,
  useLazyGetGameQuery,
  useNextTurnMutation,
  useStartGameMutation,
  useUpdateGameArmyMutation,
  useUpdateScoreAndCPMutation
} = gamesApi

export {
  useCreateGameMutation,
  useEndGameMutation,
  useGetEndedGameListQuery,
  useGetGameQuery,
  useGetNewGameQuery,
  useLazyGetGameQuery,
  useNextTurnMutation,
  useStartGameMutation,
  useUpdateGameArmyMutation,
  useUpdateScoreAndCPMutation
}

export { default as useGameArmyUpdateListener } from './useGameArmyUpdateListener'
export { default as useGameArmyUpdates } from './useGameArmyUpdates'
export { default as useGameUpdateListener } from './useGameUpdateListener'
export { default as useGameUpdates } from './useGameUpdates'
