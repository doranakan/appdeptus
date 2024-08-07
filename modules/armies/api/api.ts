import { coreApi } from 'appdeptus/api'
import {
  createArmy,
  deleteArmy,
  getArmies,
  getArmy,
  getArmyToEdit,
  getCodex,
  getCodexes,
  getCodexUnits,
  updateArmy
} from './endpoints'
import ArmiesApiTag from './tags'

const armiesApi = coreApi
  .enhanceEndpoints({
    addTagTypes: [...Object.values(ArmiesApiTag)]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createArmy: createArmy(builder),
      deleteArmy: deleteArmy(builder),
      getArmies: getArmies(builder),
      getArmy: getArmy(builder),
      getArmyToEdit: getArmyToEdit(builder),
      getCodex: getCodex(builder),
      getCodexes: getCodexes(builder),
      getCodexUnits: getCodexUnits(builder),
      updateArmy: updateArmy(builder)
    }),
    overrideExisting: true
  })

export default armiesApi
