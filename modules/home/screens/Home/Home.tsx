import { Badge, Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Button, Loading } from 'appdeptus/components'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetArmiesQuery } from '../../api'

const HomeScreen = () => {
  const router = useRouter()

  const { data, isFetching } = useGetArmiesQuery()

  if (isFetching) {
    return <Loading />
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1 }}
    >
      <Box
        flex={1}
        gap='$4'
        px='$4'
      >
        <HStack
          alignItems='center'
          justifyContent='space-between'
        >
          <Text
            fontWeight='$bold'
            size='3xl'
          >
            Appdeptus
          </Text>
          <Button
            iconColor='$info500'
            iconName='plus-circle'
            onPress={() => router.push('home/army-builder')}
            size='xl'
            variant='link'
          />
        </HStack>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <Box height='$4' />}
          renderItem={({ item }) => (
            <Box
              backgroundColor='$backgroundLight0'
              borderRadius='$lg'
              flex={1}
              p='$4'
            >
              <HStack
                flex={1}
                justifyContent='space-between'
              >
                <VStack gap='$1'>
                  <Text fontWeight='bold'>{item.name}</Text>
                  <Badge
                    borderRadius='$md'
                    variant='outline'
                  >
                    <Text size='sm'>{`Codex ${item.codex.name}`}</Text>
                  </Badge>
                </VStack>
                <Text
                  fontWeight='bold'
                  textAlign='right'
                >
                  {item.totalPoints} points
                </Text>
              </HStack>
            </Box>
          )}
          style={{ flex: 1 }}
        />
      </Box>
    </SafeAreaView>
  )
}

export default HomeScreen
