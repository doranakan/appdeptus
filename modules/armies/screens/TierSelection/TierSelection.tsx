import { HStack, VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Button, Loading, Modal } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Trash2 } from 'lucide-react-native'
import pluralize from 'pluralize'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useGetCodexQuery, useGetCodexUnitsQuery } from '../../api'
import { ArmyCoverImage, UnitCard } from '../../components'

const TierSelectionScreen = () => {
  const router = useRouter()

  const { codexId, unitIndex, unitId } = useLocalSearchParams<{
    codexId: string
    unitIndex: string
    unitId: string
  }>()

  const { data: codex } = useGetCodexQuery(codexId ?? skipToken)
  const { unit } = useGetCodexUnitsQuery(codexId ?? skipToken, {
    selectFromResult: ({ data }) => {
      if (data) {
        const unit = data.find(({ id }) => id === unitId)
        return { unit }
      }
      return { unit: undefined }
    }
  })

  const { fields, update, remove } = useFieldArray<ArmyForm, 'units'>({
    name: 'units'
  })

  const units = useMemo(
    () => fields.filter(({ unit: unitId }) => unitId === unit?.id),
    [fields, unit]
  )

  useEffect(() => {
    if (!units.length) {
      router.back()
    }
  }, [router, units.length])

  if (!codex || !unit || !unitIndex || !unitId) {
    return <Loading />
  }

  return (
    <>
      <ArmyCoverImage codexName={codex.name} />
      <Modal title={unit.name}>
        <VStack
          gap='$4'
          p='$4'
        >
          {units.map(({ id: choiceId, tier: selectedTierId }, choiceIndex) => {
            const tierPoints =
              unit.tiers.find(({ id }) => id === selectedTierId)?.points ?? 0
            return (
              <UnitCard
                caption={unit.caption}
                name={unit.name}
                points={tierPoints}
                subtitle={''}
                key={`${unit.name}-${choiceIndex}`}
              >
                <HStack gap='$2'>
                  {unit.tiers.map((tier) => {
                    return (
                      <Button
                        action={
                          tier.id === selectedTierId ? 'secondary' : 'negative'
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
                  <Button
                    Icon={Trash2}
                    onPress={() => {
                      remove(
                        fields.findIndex(
                          ({ id: fieldId }) => fieldId === choiceId
                        )
                      )
                    }}
                  />
                </HStack>
              </UnitCard>
            )
          })}
        </VStack>
      </Modal>
    </>
  )
}

export default TierSelectionScreen
