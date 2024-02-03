import React from 'react'
import { Box, Text } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { useGetFactionsQuery } from '../../api'
import { Loading } from 'appdeptus/components'

const FactionSelectionScreen = () => {
  const { data } = useGetFactionsQuery()

  if (!data) {
    return <Loading />
  }

  return (
    <Box alignItems='center' flex={1} justifyContent='center'>
      <Box gap='$4'>
        {data.map((faction) => (
          <Link
            href={{
              params: {
                factionId: faction.id
              },
              pathname: 'home/army-builder/codex-selection'
            }}
            key={faction.id}
          >
            <Text>{faction.name}</Text>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default FactionSelectionScreen
