import { Input } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { NotebookPen } from 'lucide-react-native'
import { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const NameInput = () => {
  const { control } = useFormContext<ArmyBuilder>()

  return (
    <Controller
      name='name'
      render={({ field }) => (
        <Input
          Icon={NotebookPen}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          placeholder='Give your army a name'
          value={field.value}
        />
      )}
      control={control}
    />
  )
}

export default memo(NameInput)
