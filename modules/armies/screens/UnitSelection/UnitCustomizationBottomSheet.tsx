import {
  Badge,
  BottomSheet,
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
  CircleFadingPlus,
  Square,
  SquareCheck
} from 'lucide-react-native'
import pluralize from 'pluralize'
import React, { memo, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import ref from './ref'

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
      ref.current?.dismiss()
    }
  }, [selectedUnits.length])

  return (
    <BottomSheet
      ref={ref}
      onPressBackdrop={() => ref.current?.dismiss()}
    >
      <VStack space='md'>
        <Text
          className='text-center text-primary-50'
          family='body-bold'
        >
          {selectedUnit.name}
        </Text>
        {selectedUnits.map((unit) => (
          <Card key={unit.selectionId}>
            <VStack
              className='p-4'
              space='md'
            >
              {'enhancement' in unit && unit.enhancement ? (
                <HStack className='justify-end'>
                  <Badge
                    text={`${unit.enhancement.name} - ${unit.enhancement.points}PTS`}
                    Icon={CircleFadingPlus}
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
                        const totalPoints = watch('points')

                        setValue(
                          'points',
                          totalPoints - unit.tier.points + points
                        )

                        setValue(
                          'units',
                          units.map((u) => {
                            if (u.selectionId === unit.selectionId) {
                              return {
                                ...unit,
                                tier: { id, models, points }
                              }
                            }
                            return u
                          })
                        )
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
                      const isUpgradeAlreadySelected = !!unit.upgrades.find(
                        ({ id: selectedUpgradeId }) => selectedUpgradeId === id
                      )
                      return (
                        <Pressable
                          className={clsx(
                            !isUpgradeAlreadySelected && 'opacity-60'
                          )}
                          key={id}
                          onPress={() => {
                            const totalPoints = watch('points')

                            if (isUpgradeAlreadySelected) {
                              setValue(
                                'units',
                                units.map((u) => {
                                  if (u.selectionId === unit.selectionId) {
                                    return {
                                      ...unit,
                                      upgrades: unit.upgrades.filter(
                                        ({ id: selectedUpgradeId }) =>
                                          selectedUpgradeId !== id
                                      )
                                    }
                                  }
                                  return u
                                })
                              )

                              setValue('points', totalPoints - points)
                              return
                            }

                            setValue(
                              'units',
                              units.map((u) => {
                                if (u.selectionId === unit.selectionId) {
                                  return {
                                    ...unit,
                                    upgrades: [
                                      ...unit.upgrades,
                                      { id, name, points }
                                    ]
                                  }
                                }
                                return u
                              })
                            )

                            setValue('points', totalPoints + points)
                          }}
                        >
                          <HStack
                            className='items-center'
                            space='md'
                          >
                            <Icon
                              as={
                                isUpgradeAlreadySelected ? SquareCheck : Square
                              }
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
                  const totalPoints = watch('points')

                  setValue(
                    'units',
                    units.filter(
                      ({ selectionId }) => selectionId !== unit.selectionId
                    )
                  )

                  const upgradePoints = unit.upgrades.reduce(
                    (acc, upgrade) => (acc += upgrade.points),
                    0
                  )

                  const enhancement =
                    'enhancement' in unit ? unit.enhancement : undefined

                  setValue(
                    'points',
                    totalPoints -
                      unit.tier.points -
                      upgradePoints -
                      (enhancement?.points ?? 0)
                  )

                  if (enhancement) {
                    const enhancements = watch('detachment.enhancements')
                    setValue(
                      'detachment.enhancements',
                      enhancements.filter(({ id }) => enhancement.id === id)
                    )
                  }
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
