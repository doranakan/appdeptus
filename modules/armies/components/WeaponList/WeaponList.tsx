import { Text, VStack } from '@gluestack-ui/themed'
import { type Weapon } from 'appdeptus/models'
import { useMemo } from 'react'

type WeaponListProps = {
  optionalWeapons?: Weapon[]
  weapons: Weapon[]
}

const WeaponList = ({ optionalWeapons, weapons }: WeaponListProps) => {
  const rangedWeapons = useMemo(
    () => weapons.filter(({ type }) => type === 'ranged'),
    [weapons]
  )
  const meleeWeapons = useMemo(
    () => weapons.filter(({ type }) => type === 'melee'),
    [weapons]
  )

  const optionalRangedWeapons = useMemo(
    () =>
      optionalWeapons
        ? optionalWeapons.filter(({ type }) => type === 'ranged')
        : undefined,
    [optionalWeapons]
  )
  const optionalMeleeWeapons = useMemo(
    () =>
      optionalWeapons
        ? optionalWeapons.filter(({ type }) => type === 'melee')
        : undefined,
    [optionalWeapons]
  )

  return (
    <VStack gap='$2'>
      <VStack>
        {rangedWeapons.length ? (
          <Text
            size='sm'
            fontWeight='$bold'
          >
            Ranged weapons:{' '}
            <Text size='sm'>
              {rangedWeapons.map(({ name }) => name).join(', ')}
            </Text>
          </Text>
        ) : undefined}

        {meleeWeapons.length ? (
          <Text
            size='sm'
            fontWeight='$bold'
          >
            Melee weapons:{' '}
            <Text size='sm'>
              {meleeWeapons.map(({ name }) => name).join(', ')}
            </Text>
          </Text>
        ) : undefined}
        {optionalRangedWeapons?.length ? (
          <Text
            size='sm'
            fontWeight='$bold'
          >
            Optional ranged weapons:{' '}
            <Text size='sm'>
              {optionalRangedWeapons.map(({ name }) => name).join(', ')}
            </Text>
          </Text>
        ) : undefined}

        {optionalMeleeWeapons?.length ? (
          <Text
            size='sm'
            fontWeight='$bold'
          >
            Optional melee weapons:{' '}
            <Text size='sm'>
              {optionalMeleeWeapons.map(({ name }) => name).join(', ')}
            </Text>
          </Text>
        ) : undefined}
      </VStack>
    </VStack>
  )
}

export default WeaponList
