import { Box, Text } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import React from 'react'
import { useFormContext } from 'react-hook-form'

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
  const { watch } = useFormContext<ArmyForm>()

  const totalPoints = watch('totalPoints')

  return (
    <Box
      backgroundColor='$backgroundLight0'
      borderBottomColor='$light200'
      borderBottomWidth='$1'
      flexDirection='row'
      p='$4'
    >
      <Box
        justifyContent='center'
        flex={2}
      >
        <Text fontSize='$3xl'>
          <Text fontWeight='$black'>{totalPoints}</Text>
          <Text> total points</Text>
        </Text>
      </Box>
      <Button
        flex={1}
        iconName='clipboard-list'
        isDisabled={!totalPoints}
        loading={loading}
        onPress={onSubmit}
        text={submitTitle}
      />
    </Box>
  )
}

export default UnitListHeader
