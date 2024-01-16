import React from 'react'
import { Box, Text } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

const CodexSelectionScreen = () => {
  const { factionId } = useLocalSearchParams()
  return (
    <Box alignItems='center' flex={1} justifyContent='center'>
      <Box>
        <Text>CodexSelection {factionId}</Text>
      </Box>
    </Box>
  )
}
export default CodexSelectionScreen
