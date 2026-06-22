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
import { getCostForPick, type ArmyBuilder, type SelectableUnit } from 'appdeptus/models'
import clsx from 'clsx'
import {
  Circle,
  CircleDot,
  CircleFadingPlus,
  CircleMinus,
  CirclePlus,
  Square,
  SquareCheck
} from 'lucide-react-native'
import pluralize from 'pluralize'
import { memo, useEffect, useMemo } from 'react'
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
        {selectedUnits.map((unit, unitIndex) => (
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
                  {selectedUnit.tiers.map((newTier) => (
                    <Pressable
                      disabled={unit.tier.id === newTier.id}
                      className={clsx(unit.tier.id !== newTier.id && 'opacity-60')}
                      key={newTier.id}
                      onPress={() => {
                        const totalPoints = watch('points')
                        const adjustedTier = {
                          ...newTier,
                          points: getCostForPick(newTier, unitIndex + 1)
                        }

                        setValue(
                          'points',
                          totalPoints - unit.tier.points + adjustedTier.points
                        )

                        setValue(
                          'units',
                          units.map((u) => {
                            if (u.selectionId === unit.selectionId) {
                              return { ...unit, tier: adjustedTier }
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
                          as={unit.tier.id === newTier.id ? CircleDot : Circle}
                          className='text-primary-50'
                        />
                        <HStack className='flex-1 justify-between'>
                          <Text>{`${newTier.models} ${pluralize('Model', newTier.models)}`}</Text>
                          <Text
                            className='uppercase'
                            family='body-bold'
                          >{`${getCostForPick(newTier, unitIndex + 1)}pts`}</Text>
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
                    {selectedUnit.upgrades.map(({ id, name, points, maxQuantity, quantityMode }) => {
                      const currentQty = unit.upgrades.filter(({ id: sid }) => sid === id).length
                      const maxQty = quantityMode === 'per-model'
                        ? unit.tier.models
                        : (maxQuantity ?? 1)

                      if (quantityMode === 'per-model') {
                        const totalCost = currentQty * points
                        return (
                          <HStack
                            className='items-center'
                            key={id}
                            space='md'
                          >
                            <Pressable
                              disabled={currentQty === 0}
                              onPress={() => {
                                const totalPoints = watch('points')
                                let removed = false
                                setValue(
                                  'units',
                                  units.map((u) => {
                                    if (u.selectionId !== unit.selectionId) return u
                                    const upgrades = [...unit.upgrades]
                                    const idx = upgrades.findLastIndex(({ id: sid }) => sid === id)
                                    if (idx !== -1) {
                                      upgrades.splice(idx, 1)
                                      removed = true
                                    }
                                    return { ...unit, upgrades }
                                  })
                                )
                                if (removed) setValue('points', totalPoints - points)
                              }}
                            >
                              <Icon
                                as={CircleMinus}
                                className={clsx(currentQty === 0 ? 'text-primary-300' : 'text-primary-50')}
                              />
                            </Pressable>
                            <Text
                              className='w-4 text-center'
                              family='body-bold'
                            >
                              {currentQty}
                            </Text>
                            <Pressable
                              disabled={currentQty === maxQty}
                              onPress={() => {
                                const totalPoints = watch('points')
                                setValue(
                                  'units',
                                  units.map((u) =>
                                    u.selectionId === unit.selectionId
                                      ? { ...unit, upgrades: [...unit.upgrades, { id, name, points, maxQuantity, quantityMode }] }
                                      : u
                                  )
                                )
                                setValue('points', totalPoints + points)
                              }}
                            >
                              <Icon
                                as={CirclePlus}
                                className={clsx(currentQty === maxQty ? 'text-primary-300' : 'text-primary-50')}
                              />
                            </Pressable>
                            <HStack className='flex-1 justify-between'>
                              <Text>{name}</Text>
                              <Text
                                className='uppercase'
                                family='body-bold'
                              >{`${totalCost}pts`}</Text>
                            </HStack>
                          </HStack>
                        )
                      }

                      const isSelected = currentQty > 0
                      return (
                        <Pressable
                          className={clsx(!isSelected && 'opacity-60')}
                          key={id}
                          onPress={() => {
                            const totalPoints = watch('points')
                            if (isSelected) {
                              setValue(
                                'units',
                                units.map((u) =>
                                  u.selectionId === unit.selectionId
                                    ? { ...unit, upgrades: unit.upgrades.filter(({ id: sid }) => sid !== id) }
                                    : u
                                )
                              )
                              setValue('points', totalPoints - points)
                            } else {
                              setValue(
                                'units',
                                units.map((u) =>
                                  u.selectionId === unit.selectionId
                                    ? { ...unit, upgrades: [...unit.upgrades, { id, name, points, maxQuantity, quantityMode }] }
                                    : u
                                )
                              )
                              setValue('points', totalPoints + points)
                            }
                          }}
                        >
                          <HStack
                            className='items-center'
                            space='md'
                          >
                            <Icon
                              as={isSelected ? SquareCheck : Square}
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
                disabled={unitIndex !== selectedUnits.length - 1}
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
