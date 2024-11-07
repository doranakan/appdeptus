import {
  Badge,
  BottomSheet,
  bottomSheetRef,
  Button,
  Card,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack
} from 'appdeptus/components'
import { type ArmyBuilder, type SelectableUnit } from 'appdeptus/models'
import clsx from 'clsx'
import {
  Circle,
  CircleDot,
  Link,
  Square,
  SquareCheck
} from 'lucide-react-native'
import pluralize from 'pluralize'
import React, { memo, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

type UnitCustomizationBottomSheetProps = {
  selectedUnit: SelectableUnit
}

const UnitCustomizationBottomSheet = ({
  selectedUnit
}: UnitCustomizationBottomSheetProps) => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const units = watch('units')

  const selectedUnits = useMemo(
    () => units.filter(({ name }) => name === selectedUnit.name),
    [selectedUnit.name, units]
  )

  useEffect(() => {
    if (!selectedUnits.length) {
      bottomSheetRef.current?.dismiss()
    }
  }, [selectedUnits.length])

  return (
    <BottomSheet>
      <VStack space='md'>
        <Text
          className='text-center text-primary-50'
          family='body-bold'
        >
          {selectedUnit.name}
        </Text>
        {selectedUnits.map((unit) => (
          <Card key={unit.id}>
            <VStack
              className='p-4'
              space='md'
            >
              {unit.teamId ? (
                <HStack className='justify-end'>
                  <Badge
                    text={
                      units.find(
                        ({ id, teamId }) =>
                          id !== unit.id && teamId === unit.teamId
                      )?.name ?? ''
                    }
                    Icon={Link}
                  />
                </HStack>
              ) : null}

              <VStack space='sm'>
                <Text
                  className='uppercase'
                  family='body-bold'
                  size='sm'
                >
                  unit size
                </Text>
                <VStack space='md'>
                  {selectedUnit.tiers.map(({ id, models, points }) => (
                    <Pressable
                      disabled={unit.tier.id === id}
                      className={clsx(unit.tier.id !== id && 'opacity-60')}
                      key={id}
                      onPress={() => {
                        setValue('units', [
                          ...units.filter(({ id }) => id !== unit.id),
                          { ...unit, tier: { id, models, points } }
                        ])
                      }}
                    >
                      <HStack
                        className='items-center'
                        space='md'
                      >
                        <Icon
                          as={unit.tier.id === id ? CircleDot : Circle}
                          className='text-primary-50'
                        />
                        <HStack className='flex-1 justify-between'>
                          <Text>{`${models} ${pluralize('Model', models)}`}</Text>
                          <Text
                            className='uppercase'
                            family='body-bold'
                          >{`${points}pts`}</Text>
                        </HStack>
                      </HStack>
                    </Pressable>
                  ))}
                </VStack>
              </VStack>

              {selectedUnit.upgrades.length ? (
                <VStack space='sm'>
                  <Text
                    className='uppercase'
                    family='body-bold'
                    size='sm'
                  >
                    unit upgrades
                  </Text>
                  <VStack space='md'>
                    {selectedUnit.upgrades.map(({ id, name, points }) => {
                      const isUpgradeSelected = !!unit.upgrades.find(
                        ({ id: selectedUpgradeId }) => selectedUpgradeId === id
                      )
                      return (
                        <Pressable
                          className={clsx(!isUpgradeSelected && 'opacity-60')}
                          key={id}
                          onPress={() => {
                            if (isUpgradeSelected) {
                              setValue('units', [
                                ...units.filter(({ id }) => id !== unit.id),
                                {
                                  ...unit,
                                  upgrades: [
                                    ...unit.upgrades.filter(
                                      ({ id: selectedUpgradeId }) =>
                                        selectedUpgradeId !== id
                                    )
                                  ]
                                }
                              ])
                              return
                            }
                            setValue('units', [
                              ...units.filter(({ id }) => id !== unit.id),
                              {
                                ...unit,
                                upgrades: [
                                  ...unit.upgrades,
                                  { id, name, points }
                                ]
                              }
                            ])
                          }}
                        >
                          <HStack
                            className='items-center'
                            space='md'
                          >
                            <Icon
                              as={isUpgradeSelected ? SquareCheck : Square}
                              className='text-primary-50'
                            />
                            <HStack className='flex-1 justify-between'>
                              <Text>{name}</Text>
                              <Text
                                className='uppercase'
                                family='body-bold'
                              >{`${points}pts`}</Text>
                            </HStack>
                          </HStack>
                        </Pressable>
                      )
                    })}
                  </VStack>
                </VStack>
              ) : null}
              <Button
                className='shadow-sm'
                color='secondary'
                onPress={() => {
                  const teamId = unit.teamId
                  if (teamId) {
                    const pairedUnit = units.find(
                      ({ id: pairedUnitId, teamId: pairedUnitTeamId }) =>
                        pairedUnitId !== unit.id && teamId === pairedUnitTeamId
                    )
                    if (pairedUnit) {
                      setValue('units', [
                        ...units.filter(
                          ({ id }) => id !== unit.id && id !== pairedUnit.id
                        ),
                        {
                          ...pairedUnit,
                          teamId: undefined
                        }
                      ])
                    }

                    return
                  }

                  setValue(
                    'units',
                    units.filter(({ id }) => id !== unit.id)
                  )
                }}
                text='delete'
                size='sm'
                variant='callback'
              />
            </VStack>
          </Card>
        ))}
      </VStack>
    </BottomSheet>
  )
}

export default memo(UnitCustomizationBottomSheet)
