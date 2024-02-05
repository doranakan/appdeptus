import { Box, ScrollView } from '@gluestack-ui/themed'
import { Button, Loading } from 'appdeptus/components'
import { useRouter } from 'expo-router'
import React from 'react'
import { useGetCodexesQuery } from '../../api'

const CodexSelectionScreen = () => {
  const router = useRouter()

  const { data: codexes } = useGetCodexesQuery()

  if (!codexes) {
    return <Loading />
  }

  return (
    <ScrollView>
      <Box
        flex={1}
        gap='$4'
        p='$4'
      >
        {codexes.map((codex) => (
          <Button
            flex={1}
            key={codex.id}
            iconName='chevron-right'
            onPress={() =>
              router.navigate({
                params: {
                  codexId: codex.id
                },
                pathname: '/home/army-builder/unit-selection'
              })
            }
            text={codex.name}
          />
        ))}
      </Box>
    </ScrollView>
  )
}
export default CodexSelectionScreen
