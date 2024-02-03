import React from 'react'
import { Box, Text } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

const UnitSelectionScreen = () => {
  const { codexId } = useLocalSearchParams<{ codexId: string }>()

  return (
    <Box alignItems='center' flex={1} justifyContent='center'>
      <Text>Codex {codexId}</Text>
    </Box>
  )
}
export default UnitSelectionScreen
