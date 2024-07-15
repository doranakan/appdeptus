import { Text, VStack } from '@gluestack-ui/themed'
import { Button, Card, Modal } from 'appdeptus/components'
import { type ArmyForm, type Model, type Wargear } from 'appdeptus/models'
import { compact, times } from 'lodash'
import pluralize from 'pluralize'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { StatSheet, WeaponList } from '../../components'
import OptionRadio from './OptionRadio'

type OptionItemProps = {
  choiceIndex: number
  count: number
  model: Model
  wargear: Wargear
}

// FIXME: This component is not used anymore
const OptionItem = ({
  choiceIndex,
  count,
  model,
  wargear
}: OptionItemProps) => {
  const { baseWargear, options } = wargear

  const { watch } = useFormContext<ArmyForm>()

  const units = watch('units')[choiceIndex]?.options

  const weapons = useMemo(
    () => baseWargear.map(({ weapon }) => weapon),
    [baseWargear]
  )

  const optionalWeapons = useMemo(() => {
    if (!options || !units) {
      return undefined
    }
    return compact(
      units.map(({ optionId, weaponId }) =>
        options
          .find(({ id }) => id === optionId)
          ?.weapons.find(({ id }) => id === weaponId)
      )
    )
  }, [units, options])

  return (
    <>
      <Card gap='$2'>
        <Text fontWeight='$bold'>{`${count} ${pluralize(model.name, count)}`}</Text>
        <StatSheet model={model} />
        <WeaponList
          weapons={weapons}
          optionalWeapons={optionalWeapons}
        />

        {options ? (
          <Button
            backgroundColor='$secondary500'
            text='Options'
          />
        ) : undefined}
      </Card>
      {options ? (
        <Modal title='Customize wargear'>
          <VStack
            gap='$4'
            p='$4'
          >
            {options.map(({ id, weapons, count, replaces }) => (
              <VStack
                backgroundColor='$backgroundLight0'
                key={id}
                p='$4'
                gap='$2'
              >
                <Text
                  fontWeight='$bold'
                  size='sm'
                >
                  {replaces
                    ? `Replace ${baseWargear.find(({ id: wargearId }) => wargearId === replaces)?.weapon.name}`
                    : 'Add'}
                </Text>

                {times(count ?? 1, (time) => (
                  <OptionRadio
                    choiceIndex={choiceIndex}
                    key={time}
                    id={id}
                    weapons={weapons}
                  />
                ))}
              </VStack>
            ))}
          </VStack>
        </Modal>
      ) : undefined}
    </>
  )
}

export default OptionItem
