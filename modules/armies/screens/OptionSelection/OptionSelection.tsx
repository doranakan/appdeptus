import { VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import { useGetUnitOptionsQuery } from '../../api'
import OptionItem from './OptionItem'

const OptionSelectionScreen = () => {
  const { choiceIndex, tierId } = useLocalSearchParams<{
    choiceIndex: string
    tierId: string
  }>()

  const { data } = useGetUnitOptionsQuery(tierId ?? skipToken)

  if (!data || !choiceIndex) {
    return <Loading />
  }

  return (
    <VStack
      gap='$4'
      p='$4'
    >
      {data.map(({ model, count, ...wargear }, index) => (
        <OptionItem
          choiceIndex={Number(choiceIndex)}
          count={count}
          key={`${model.name}-${index}`}
          model={model}
          wargear={wargear}
        />
      ))}
    </VStack>
  )
}

export default OptionSelectionScreen
