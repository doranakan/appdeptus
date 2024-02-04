import { FontAwesome5 } from '@expo/vector-icons'
import { Box, Button, ButtonText, ScrollView } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { useGetCodexesQuery } from '../../api'

const CodexSelectionScreen = () => {
  const router = useRouter()

  const { factionId } = useLocalSearchParams<{ factionId: string }>()

  const { data: codexes } = useGetCodexesQuery(factionId ?? skipToken)

  if (!codexes) {
    return <Loading />
  }

  return (
    <ScrollView>
      <Box flex={1} gap='$4' p='$4'>
        {codexes.map((codex) => (
          <Button
            $active-bgColor='$light200'
            backgroundColor='$white'
            borderRadius='$md'
            flex={1}
            gap='$2'
            justifyContent='flex-start'
            key={codex.id}
            onPress={() =>
              router.navigate({
                params: {
                  codexId: codex.id
                },
                pathname: '/home/army-builder/unit-selection'
              })
            }
            size='lg'
          >
            <ButtonText
              color='$textDark700'
              flex={1}
              fontWeight='$bold'
              textAlign='left'
            >
              {codex.name}
            </ButtonText>
            <ButtonText color='$textDark700'>
              <FontAwesome5 name='chevron-right' />
            </ButtonText>
          </Button>
        ))}
      </Box>
    </ScrollView>
  )
}
export default CodexSelectionScreen
