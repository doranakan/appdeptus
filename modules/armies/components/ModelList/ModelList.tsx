import { HStack, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Card, Loading, Modal } from 'appdeptus/components'
import { type Army, type ArmyUnit } from 'appdeptus/models'
import { uniqBy } from 'lodash'
import pluralize from 'pluralize'
import { memo } from 'react'
import { useGetUnitOptionsQuery } from '../../api'
import ArmyCoverImage from '../ArmyCoverImage'
import StatSheet from '../StatSheet'
import WeaponStats from '../WeaponStats'

type ModelListProps = {
  army: Army | undefined
  unit: ArmyUnit | undefined
  tierId: string | undefined
}

const ModelList = ({ army, unit, tierId }: ModelListProps) => {
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

  if (!army || !unit || !models) {
    return <Loading />
  }

  return (
    <>
      <ArmyCoverImage codexName={army.codex.name} />
      <Modal title={unit.name}>
        <ScrollView flex={1}>
          <VStack
            gap='$4'
            p='$4'
          >
            {models.map(({ count, model, baseWargear, options }, index) => (
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
                    <Text
                      bold
                      color='$white'
                      size='xl'
                      lineHeight='$lg'
                    >
                      {`${pluralize(model.name, count)}`}
                    </Text>
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
                    ...uniqBy(
                      [
                        ...baseWargear.map(({ weapon }) => weapon),
                        ...(options?.flatMap(({ weapons }) => weapons) ?? [])
                      ].filter(({ type }) => type === 'ranged'),
                      'id'
                    )
                  ]}
                />
                <WeaponStats
                  type='melee'
                  weapons={[
                    ...uniqBy(
                      [
                        ...baseWargear.map(({ weapon }) => weapon),
                        ...(options?.flatMap(({ weapons }) => weapons) ?? [])
                      ].filter(({ type }) => type === 'melee'),
                      'id'
                    )
                  ]}
                />
              </Card>
            ))}
          </VStack>
        </ScrollView>
      </Modal>
    </>
  )
}

export default memo(ModelList)
