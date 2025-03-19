import { coreApi } from 'appdeptus/api'
import {
  createCommunity,
  deleteCommunity,
  deleteMember,
  getCommonCommunities,
  getCommunity,
  getCommunityArmyList,
  getCommunityGameList,
  getCommunityList,
  getCommunityRequestList,
  searchCommunities,
  searchCommunity,
  sendCommunityRequest,
  updateCommunityName,
  updateCommunityRequest,
  updateCommunityVisibility
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
      getCommonCommunities: getCommonCommunities(builder),
      getCommunityList: getCommunityList(builder),
      getCommunityArmyList: getCommunityArmyList(builder),
      getCommunityGameList: getCommunityGameList(builder),
      getCommunityRequestList: getCommunityRequestList(builder),
      searchCommunities: searchCommunities(builder),
      searchCommunity: searchCommunity(builder),
      sendCommunityRequest: sendCommunityRequest(builder),
      updateCommunityName: updateCommunityName(builder),
      updateCommunityRequest: updateCommunityRequest(builder),
      updateCommunityVisibility: updateCommunityVisibility(builder)
    }),
    overrideExisting: true
  })

export default communitiesApi
