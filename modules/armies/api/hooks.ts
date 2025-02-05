import armiesApi from './api'

const {
  useCreateArmyMutation,
  useDeleteArmyMutation,
  useGetArmyListQuery,
  useGetArmyQuery,
  useGetCodexListQuery,
  useGetDetachmentListQuery,
  useGetUnitListQuery,
  useGetInvalidUnitsQuery,
  useUpdateArmyMutation
} = armiesApi

export {
  useCreateArmyMutation,
  useDeleteArmyMutation,
  useGetArmyListQuery,
  useGetArmyQuery,
  useGetCodexListQuery,
  useGetDetachmentListQuery,
  useGetInvalidUnitsQuery,
  useGetUnitListQuery,
  useUpdateArmyMutation
}
