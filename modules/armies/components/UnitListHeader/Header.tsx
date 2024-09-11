import { Input, InputField, Pressable, VStack } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
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
    <VStack
      pb='$4'
      pr='$4'
    >
      <VStack>
        <Controller
          control={control}
          rules={{
            maxLength: 25
          }}
          render={({ field: { onChange, ...props } }) => (
            <Input borderWidth='$0'>
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
