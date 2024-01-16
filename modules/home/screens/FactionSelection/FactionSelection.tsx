import React from 'react'
import { Box, Text } from '@gluestack-ui/themed'
import { Link } from 'expo-router'

const FactionSelectionScreen = () => (
  <Box alignItems='center' flex={1} justifyContent='center'>
    <Box>
      <Link
        href={{
          params: {
            factionId: '1'
          },
          pathname: 'home/army-builder/codex-selection'
        }}
      >
        <Text>FactionSelection</Text>
      </Link>
    </Box>
  </Box>
)

export default FactionSelectionScreen
