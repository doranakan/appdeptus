import { coreApi } from 'appdeptus/api'
import {
  createCommunity,
  deleteCommunity,
  deleteMember,
  getCommunity,
  getCommunityArmyList,
  getCommunityGameList,
  getCommunityList,
  searchCommunities,
  searchCommunity,
  updateCommunityName
} from './endpoints'
import { communitiesApiTags } from './tags'

const communitiesApi = coreApi
  .enhanceEndpoints({
    addTagTypes: communitiesApiTags
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCommunity: createCommunity(builder),
      deleteCommunity: deleteCommunity(builder),
      deleteMember: deleteMember(builder),
      getCommunity: getCommunity(builder),
      getCommunityList: getCommunityList(builder),
      getCommunityArmyList: getCommunityArmyList(builder),
      getCommunityGameList: getCommunityGameList(builder),
      searchCommunities: searchCommunities(builder),
      searchCommunity: searchCommunity(builder),
      updateCommunityName: updateCommunityName(builder)
    }),
    overrideExisting: true
  })

export default communitiesApi
