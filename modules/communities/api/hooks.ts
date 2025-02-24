import communitiesApi from './api'

const {
  useCreateCommunityMutation,
  useDeleteMemberMutation,
  useDeleteCommunityMutation,
  useGetCommunityListQuery,
  useGetCommunityArmyListQuery,
  useGetCommunityGameListQuery,
  useLazySearchCommunitiesQuery,
  useLazySearchCommunityQuery,
  useGetCommunityQuery,
  useUpdateCommunityNameMutation
} = communitiesApi

export {
  useCreateCommunityMutation,
  useDeleteCommunityMutation,
  useDeleteMemberMutation,
  useGetCommunityArmyListQuery,
  useGetCommunityGameListQuery,
  useGetCommunityListQuery,
  useGetCommunityQuery,
  useLazySearchCommunitiesQuery,
  useLazySearchCommunityQuery,
  useUpdateCommunityNameMutation
}
