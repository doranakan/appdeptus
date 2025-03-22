import communitiesApi from './api'

const {
  useCreateCommunityMutation,
  useDeleteMemberMutation,
  useDeleteCommunityMutation,
  useGetCommunityListQuery,
  useGetCommonCommunitiesQuery,
  useGetCommunityArmyListQuery,
  useGetCommunityGameListQuery,
  useGetCommunityRequestListQuery,
  useLazySearchCommunitiesQuery,
  useLazySearchCommunityQuery,
  useGetCommunityQuery,
  useSendCommunityRequestMutation,
  useUpdateCommunityNameMutation,
  useUpdateCommunityRequestMutation,
  useUpdateCommunityVisibilityMutation
} = communitiesApi

const useSearchCommunitiesQueryState =
  communitiesApi.endpoints.searchCommunities.useQueryState

export {
  useCreateCommunityMutation,
  useDeleteCommunityMutation,
  useDeleteMemberMutation,
  useGetCommonCommunitiesQuery,
  useGetCommunityArmyListQuery,
  useGetCommunityGameListQuery,
  useGetCommunityListQuery,
  useGetCommunityQuery,
  useGetCommunityRequestListQuery,
  useLazySearchCommunitiesQuery,
  useLazySearchCommunityQuery,
  useSearchCommunitiesQueryState,
  useSendCommunityRequestMutation,
  useUpdateCommunityNameMutation,
  useUpdateCommunityRequestMutation,
  useUpdateCommunityVisibilityMutation
}
