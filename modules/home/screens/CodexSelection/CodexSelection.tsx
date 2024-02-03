import React from 'react'
import { Box, Text } from '@gluestack-ui/themed'
import { Link, useLocalSearchParams } from 'expo-router'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetCodexesQuery } from '../../api'
import { Loading } from 'appdeptus/components'

const CodexSelectionScreen = () => {
  const { factionId } = useLocalSearchParams<{ factionId: string }>()

  const { data: codexes } = useGetCodexesQuery(factionId ?? skipToken)

  if (!codexes) {
    return <Loading />
  }

  return (
    <Box alignItems='center' flex={1} justifyContent='center'>
      <Box gap='$4'>
        {codexes.map((codex) => (
          <Link
            href={{
              params: {
                codexId: codex.id
              },
              pathname: 'home/army-builder/unit-selection'
            }}
            key={codex.id}
          >
            <Text>{codex.name}</Text>
          </Link>
        ))}
      </Box>
    </Box>
  )
}
export default CodexSelectionScreen
