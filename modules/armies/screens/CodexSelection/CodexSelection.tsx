import { Box, Text } from '@gluestack-ui/themed'
import { Button, CodexLogo, Loading } from 'appdeptus/components'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useGetCodexesQuery } from '../../api'

const CodexSelectionScreen = () => {
  const router = useRouter()

  const { data: codexes } = useGetCodexesQuery()

  if (!codexes) {
    return <Loading />
  }

  return (
    <Box flex={1}>
      <PagerView style={styles.flex1}>
        {codexes.map((codex) => (
          <Box
            flex={1}
            key={codex.id}
            p='$4'
          >
            <Box
              backgroundColor='$backgroundLight0'
              borderRadius='$lg'
              flex={1}
              p='$4'
            >
              <Box alignItems='center'>
                <Text
                  fontWeight='$bold'
                  size='md'
                >
                  Codex
                </Text>
                <Text
                  fontWeight='$bold'
                  size='3xl'
                >
                  {codex.name}
                </Text>
              </Box>
              <Box
                alignItems='center'
                flex={1}
                justifyContent='center'
              >
                <CodexLogo
                  codexId={codex.id}
                  height={200}
                  width={200}
                />
              </Box>
              <Button
                onPress={() =>
                  router.navigate({
                    params: {
                      codexId: codex.id
                    },
                    pathname: './unit-selection'
                  })
                }
                text='Start'
              />
            </Box>
          </Box>
        ))}
      </PagerView>
    </Box>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  }
})

export default CodexSelectionScreen