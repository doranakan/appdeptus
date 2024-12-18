import { coreApi } from 'appdeptus/api'
import {
  createArmy,
  deleteArmy,
  getArmyList,
  getCodexList,
  getDetachmentList,
  getUnitList,
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
      getArmyList: getArmyList(builder),
      getCodexList: getCodexList(builder),
      getDetachmentList: getDetachmentList(builder),
      getUnitList: getUnitList(builder),
      updateArmy: updateArmy(builder)
    }),
    overrideExisting: true
  })

export default armiesApi
