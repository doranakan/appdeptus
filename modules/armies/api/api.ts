import { coreApi } from 'appdeptus/api'
import {
  createArmy,
  deleteArmy,
  getArmy,
  getArmyList,
  getCodexList,
  getDetachmentList,
  getInvalidUnits,
  getUnitList,
  updateArmy,
  updateArmyVisibility
} from './endpoints'
import { armiesApiTags } from './tags'

const armiesApi = coreApi
  .enhanceEndpoints({
    addTagTypes: [...Object.values(armiesApiTags)]
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createArmy: createArmy(builder),
      deleteArmy: deleteArmy(builder),
      getArmy: getArmy(builder),
      getArmyList: getArmyList(builder),
      getCodexList: getCodexList(builder),
      getDetachmentList: getDetachmentList(builder),
      getInvalidUnits: getInvalidUnits(builder),
      getUnitList: getUnitList(builder),
      updateArmy: updateArmy(builder),
      updateArmyVisibility: updateArmyVisibility(builder)
    }),
    overrideExisting: true
  })

export default armiesApi
