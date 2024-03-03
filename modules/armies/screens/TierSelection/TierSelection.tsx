import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Button, Loading } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import { useLocalSearchParams, useRouter } from 'expo-router'
import pluralize from 'pluralize'
import { useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useGetCodexUnitsQuery } from '../../api'

const TierSelectionScreen = () => {
  const router = useRouter()

  const { codexId, unitIndex, unitId } = useLocalSearchParams<{
    codexId: string
    unitIndex: string
    unitId: string
  }>()

  const { unit } = useGetCodexUnitsQuery(codexId ?? skipToken, {
    selectFromResult: ({ data }) => {
      if (data) {
        const unit = data.find(({ id }) => id === unitId)
        return { unit }
      }
      return { unit: undefined }
    }
  })

  const { fields, update } = useFieldArray<ArmyForm, 'units'>({
    name: 'units'
  })

  const units = useMemo(
    () => fields.filter(({ unit: unitId }) => unitId === unit?.id),
    [fields, unit]
  )

  if (!unit || !unitIndex || !unitId) {
    return <Loading />
  }

  return (
    <VStack
      gap='$4'
      p='$4'
    >
      {units.map(({ id: choiceId, tier: selectedTierId }, choiceIndex) => (
        <VStack
          backgroundColor='$backgroundLight0'
          borderRadius='$lg'
          key={`${unit.name}-${choiceIndex}`}
          gap='$2'
          p='$4'
        >
          <HStack justifyContent='space-between'>
            <VStack>
              <Text fontWeight='$bold'>{unit.name}</Text>
              <Text size='xs'>{unit.caption}</Text>
            </VStack>
            <Text fontWeight='$bold'>
              {unit.tiers.find(({ id }) => id === selectedTierId)?.points}{' '}
              points
            </Text>
          </HStack>
          <HStack gap='$2'>
            {unit.tiers.map((tier) => {
              return (
                <Button
                  backgroundColor={
                    tier.id === selectedTierId ? '$info500' : '$info300'
                  }
                  flex={1}
                  key={tier.points}
                  text={`${tier.models} ${pluralize('model', tier.models)}`}
                  onPress={() => {
                    update(
                      fields.findIndex(
                        ({ id: fieldId }) => fieldId === choiceId
                      ),
                      {
                        options: [],
                        tier: tier.id,
                        unit: unitId
                      }
                    )
                  }}
                />
              )
            })}
          </HStack>
          <Button
            onPress={() => {
              router.push({
                params: {
                  choiceIndex: fields.findIndex(({ id }) => id === choiceId),
                  tierId: selectedTierId
                },
                pathname: './option-selection'
              })
            }}
            text='Customize'
            variant='outline'
          />
        </VStack>
      ))}
    </VStack>
  )
}

export default TierSelectionScreen
