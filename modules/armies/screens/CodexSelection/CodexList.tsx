import { Error, Loading, setTheme, TabMenu, VStack } from 'appdeptus/components'
import { type factions } from 'appdeptus/constants'
import { type ArmyBuilder, type Codex } from 'appdeptus/models'
import { useAppDispatch } from 'appdeptus/store'
import {
  type ComponentProps,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetCodexListQuery } from '../../api'
import StackedList, { type StackListMethods } from 'appdeptus/components/StackedList/StackedList'
import { useFeatureFlag } from 'appdeptus/hooks'

const CodexList = () => {
  const disabledArmies = useFeatureFlag('disabled-armies')
  const listRef = useRef<StackListMethods>(null)

  const { data, isFetching, isError, refetch } =
    useGetCodexListQuery(undefined, {
      selectFromResult: (res) => ({
        ...res,
        data: res.data?.filter(({ name }) => !disabledArmies?.includes(name))
      })
    })

  const [selectedFactions, setSelectedFactions] =
    useState<(typeof factionFilter)[number]>('all')

  const filteredData = useMemo(
    () =>
      selectedFactions === 'all'
        ? data
        : data?.filter(({ faction }) => faction === selectedFactions),
    [data, selectedFactions]
  )

  const { getValues, reset, setValue, watch } = useFormContext<ArmyBuilder>()

  const [selectedCodex, detachment] = watch(['codex.name', 'detachment'])

  const dispatch = useAppDispatch()

  const onOptionSelected = useCallback<
    ComponentProps<
      typeof TabMenu<(typeof factionFilter)[number]>
    >['onOptionSelected']
  >(
    (option) => {
      reset()
      setSelectedFactions(option)
      dispatch(setTheme('default'))
      listRef.current?.reset()
    },
    [dispatch, reset]
  )

  const handlePress = useCallback(
    (codex: Codex) => {
      if (selectedCodex === codex.name) {
        reset()
        dispatch(setTheme('default'))
        return
      }
      if (detachment && selectedCodex !== codex.name) {
        reset({
          ...getValues(),
          name: '',
          detachment: undefined,
          units: [],
          points: 0
        })
      }

      setValue('codex', codex)

      dispatch(setTheme(codex.name))
    },
    [detachment, dispatch, getValues, reset, selectedCodex, setValue]
  )

  return (
    <VStack
      className='flex-1'
      space='lg'
    >
      <TabMenu
        onOptionSelected={onOptionSelected}
        options={factionFilter}
      />
      {isError ? (
        <Error button={{ onPress: refetch, variant: 'callback', text: 'Retry' }} />
      ) : isFetching ? (
        <Loading />
      ) : !filteredData ? null : (
        <StackedList
          ref={listRef}
          data={filteredData}
          onItemPress={handlePress}
          selectedCodex={selectedCodex}
        />
      )}
      <VStack className='h-8' />
    </VStack>
  )
}

const factionFilter = ['all', 'imperium', 'chaos', 'xenos'] as const satisfies (
  | 'all'
  | (typeof factions)[number]
)[]

export default memo(CodexList)
