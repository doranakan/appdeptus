import { Input, InputField, VStack } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import { ClipboardCheck } from 'lucide-react-native'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
  const insets = useSafeAreaInsets()

  const { control, watch } = useFormContext<ArmyForm>()

  const units = watch('units')

  return (
    <VStack
      pb='$4'
      pt={insets.top}
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
                fontFamily='Grenze'
                placeholder='Army name'
                size='2xl'
              />
            </Input>
          )}
          name='name'
        />
      </VStack>

      <Button
        disabled={!units.length}
        loading={loading}
        Icon={ClipboardCheck}
        onPress={onSubmit}
        text={submitTitle}
      />
    </VStack>
  )
}

export default UnitListHeader
