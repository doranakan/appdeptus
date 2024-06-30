import { HStack, Heading, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Card, Loading, Modal } from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import { uniqBy } from 'lodash'
import pluralize from 'pluralize'
import { useGetArmyQuery, useGetUnitOptionsQuery } from '../../api'
import { ArmyCoverImage } from '../../components'
import StatSheet from '../../components/StatSheet'
import WeaponStats from './WeaponStats'

const UnitDetail = () => {
  const { armyId, tierId, unitId } = useLocalSearchParams<{
    armyId: string
    tierId: string
    unitId: string
  }>()

  const { army, unit } = useGetArmyQuery(armyId ?? skipToken, {
    selectFromResult: ({ data, ...rest }) => {
      if (!data) {
        return { army: undefined, unit: undefined }
      }

      const unit = data.units.find(({ id }) => unitId === id)

      return {
        army: data,
        unit,
        ...rest
      }
    }
  })

  const { models } = useGetUnitOptionsQuery(tierId ?? skipToken, {
    selectFromResult: ({ data, ...rest }) => {
      if (!data) {
        return { models: undefined }
      }

      const models = data.map(({ options, ...rest }) => ({
        ...rest,
        options
      }))

      return {
        models,
        ...rest
      }
    }
  })

  if (!unit || !models) {
    return <Loading />
  }

  return (
    <>
      <ArmyCoverImage army={army} />
      <Modal title={`Unit: ${unit.name}`}>
        <ScrollView flex={1}>
          <VStack
            gap='$4'
            p='$4'
          >
            {models.map(({ count, model, baseWargear }, index) => (
              <Card
                bg='$secondary50'
                gap='$4'
                key={`${model.id}-${index}`}
                p='$0'
              >
                <VStack
                  bg='$secondary600'
                  mb='$4'
                  px='$2'
                  pt='$4'
                  pb='$10'
                >
                  <HStack
                    gap='$2'
                    justifyContent='space-between'
                  >
                    <Heading
                      color='$white'
                      size='xl'
                      textTransform='uppercase'
                      lineHeight='$lg'
                    >
                      {`${pluralize(model.name, count)}`}
                    </Heading>
                    <Text
                      color='$white'
                      size='sm'
                    >
                      {`${count} ${pluralize('model', count)}`}
                    </Text>
                  </HStack>
                  <VStack
                    alignSelf='center'
                    position='absolute'
                    top='$10'
                    width='$full'
                  >
                    <StatSheet model={model} />
                  </VStack>
                </VStack>

                <WeaponStats
                  type='ranged'
                  weapons={[
                    ...baseWargear.map(({ weapon }) => weapon),
                    ...uniqBy(
                      unit.options?.map(({ weapon }) => weapon),
                      'id'
                    )
                  ].filter(({ type }) => type === 'ranged')}
                />
                <WeaponStats
                  type='melee'
                  weapons={[
                    ...baseWargear.map(({ weapon }) => weapon),
                    ...uniqBy(
                      unit.options?.map(({ weapon }) => weapon),
                      'id'
                    )
                  ].filter(({ type }) => type === 'melee')}
                />
              </Card>
            ))}
          </VStack>
        </ScrollView>
      </Modal>
    </>
  )
}

export default UnitDetail
