import { Button } from 'appdeptus/components'
import { Input, InputField } from 'appdeptus/components/ui/input'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type ArmyForm } from 'appdeptus/models'
import { ClipboardCheck } from 'lucide-react-native'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type UnitListHeaderProps = {
  loading: boolean
  onSubmit: () => void
  submitTitle: string
}

const UnitListHeader = ({
  loading,
  onSubmit,
  submitTitle
}: UnitListHeaderProps) => {
  const { control, watch } = useFormContext<ArmyForm>()

  const name = watch('name')
  const units = watch('units')

  return (
    <VStack className='pb-4 pr-4'>
      <VStack>
        <Controller
          control={control}
          rules={{
            maxLength: 25
          }}
          render={({ field: { onChange, ...props } }) => (
            <Input className='border-0'>
              <InputField
                {...props}
                onChangeText={onChange}
                placeholder='Army name'
                size='xl'
              />
            </Input>
          )}
          name='name'
        />
      </VStack>
      <Pressable
        disabled={!units.length || !name.length}
        onPress={onSubmit}
      >
        <Button
          loading={loading}
          Icon={ClipboardCheck}
          text={submitTitle}
        />
      </Pressable>
    </VStack>
  )
}

export default UnitListHeader
