import { coreApi } from 'appdeptus/api'
import {
  confirmMatch,
  createMatch,
  createRound,
  createTournament,
  deleteTournament,
  getTournament,
  getTournamentList,
  getTournamentMatchList,
  getTournamentRegistrationList,
  getTournamentRoundList,
  getUserRegistrationList,
  getUserTournamentList,
  registerForTournament,
  unregisterFromTournament,
  updateMatch,
  updateRoundStatus,
  updateTournament,
  updateTournamentStatus
} from './endpoints'
import { tournamentsApiTags } from './tags'

const tournamentsApi = coreApi
  .enhanceEndpoints({
    addTagTypes: [...Object.values(tournamentsApiTags)]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      confirmMatch: confirmMatch(builder),
      createMatch: createMatch(builder),
      createRound: createRound(builder),
      createTournament: createTournament(builder),
      deleteTournament: deleteTournament(builder),
      getTournament: getTournament(builder),
      getTournamentList: getTournamentList(builder),
      getTournamentMatchList: getTournamentMatchList(builder),
      getTournamentRegistrationList: getTournamentRegistrationList(builder),
      getTournamentRoundList: getTournamentRoundList(builder),
      getUserRegistrationList: getUserRegistrationList(builder),
      getUserTournamentList: getUserTournamentList(builder),
      registerForTournament: registerForTournament(builder),
      unregisterFromTournament: unregisterFromTournament(builder),
      updateMatch: updateMatch(builder),
      updateRoundStatus: updateRoundStatus(builder),
      updateTournament: updateTournament(builder),
      updateTournamentStatus: updateTournamentStatus(builder)
    }),
    overrideExisting: true
  })

export default tournamentsApi
