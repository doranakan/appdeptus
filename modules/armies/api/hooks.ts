import { type Army } from 'appdeptus/models'
import { useAppDispatch } from 'appdeptus/store'
import { useCallback } from 'react'
import armiesApi from './api'

const useUpdateArmyData = () => {
  const dispatch = useAppDispatch()

  return useCallback(
    ({ id, isSecret }: Pick<Army, 'id' | 'isSecret'>) => {
      dispatch(
        armiesApi.util.updateQueryData(
          'getArmy',
          String(id),
          (data) => ({
            ...data,
            isSecret
          }),
          true
        )
      )
    },
    [dispatch]
  )
}

const {
  useCreateArmyMutation,
  useDeleteArmyMutation,
  useGetArmyListQuery,
  useGetArmyQuery,
  useGetCodexListQuery,
  useGetDetachmentListQuery,
  useGetUnitListQuery,
  useGetUserArmyListQuery,
  useGetInvalidUnitsQuery,
  useUpdateArmyMutation,
  useUpdateArmyVisibilityMutation
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
  useGetUserArmyListQuery,
  useUpdateArmyData,
  useUpdateArmyMutation,
  useUpdateArmyVisibilityMutation
}
