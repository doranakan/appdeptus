import {
  CircleIcon,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  VStack
} from '@gluestack-ui/themed'
import { type ArmyForm, type Weapon } from 'appdeptus/models'
import { useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'

type OptionRadioProps = {
  choiceIndex: number
  id: string
  weapons: Weapon[]
}

const OptionRadio = ({
  choiceIndex,
  id: optionId,
  weapons
}: OptionRadioProps) => {
  const { fields, append, update, remove } = useFieldArray<
    ArmyForm['units'][0],
    'options'
  >({
    name: `units.${choiceIndex}.options` as 'options'
  })

  const selectedValue = useMemo(
    () => fields.find(({ optionId: optId }) => optId === optionId)?.weaponId,
    [fields, optionId]
  )

  const [values, setValues] = useState<string>(selectedValue ?? '')

  return (
    <RadioGroup
      value={values}
      onChange={(weaponId: string) => {
        const optionIndex = fields.findIndex(
          ({ optionId: optId }) => optId === optionId
        )
        if (weaponId.length) {
          if (values.length) {
            update(optionIndex, { optionId, weaponId })
          } else {
            append({ optionId, weaponId })
          }
        } else {
          remove(optionIndex)
        }
        setValues(weaponId)
      }}
    >
      <VStack space='sm'>
        <Radio value=''>
          <RadioIndicator mr='$2'>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>
          <RadioLabel>None</RadioLabel>
        </Radio>
        {weapons.map(({ id: weaponId, name }) => (
          <Radio
            key={weaponId}
            value={weaponId}
          >
            <RadioIndicator mr='$2'>
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>{name}</RadioLabel>
          </Radio>
        ))}
      </VStack>
    </RadioGroup>
  )
}

export default OptionRadio
