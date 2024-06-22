import {
  Box,
  Heading,
  LinearGradient,
  Pressable,
  VStack
} from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import {
  ArmyBackgroundImage,
  ArmyIcon,
  Button,
  Card,
  Loading
} from 'appdeptus/components'
import { CodexName, type ArmyForm } from 'appdeptus/models'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, useWindowDimensions } from 'react-native'
import { useGetCodexesQuery } from '../../api'

const AVAILABLED_ARMIES = [CodexName.TYRANIDS]

const CodexSelectionScreen = () => {
  const router = useRouter()

  const { height, width } = useWindowDimensions()

  const [selectedIndex, setSelectedIndex] = useState(0)

  const { data: codexes } = useGetCodexesQuery()

  const { reset } = useFormContext<ArmyForm>()

  const selectedCodex = useMemo(
    () => codexes?.[selectedIndex],
    [codexes, selectedIndex]
  )

  const startBuilding = useCallback(() => {
    reset()

    router.push({
      params: {
        codexId: selectedCodex.id
      },
      pathname: './unit-selection'
    })
  }, [reset, router, selectedCodex])

  if (!codexes || !selectedCodex) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <VStack flex={1}>
        <MaskedView
          style={{
            position: 'absolute',
            flexDirection: 'row',
            height: height / 2,
            left: width / 4,
            top: 16
          }}
          maskElement={
            <ArmyIcon
              codexName={selectedCodex.name}
              h={height / 2}
            />
          }
        >
          <ArmyBackgroundImage codexName={selectedCodex.name} />
        </MaskedView>
      </VStack>
      <VStack
        justifyContent='flex-end'
        p='$4'
      >
        <Heading size='2xl'>Codex:</Heading>

        <MaskedView
          style={{ flexDirection: 'row', height: 50 }}
          maskElement={
            <Heading
              size='4xl'
              lineHeight='$5xl'
            >
              {selectedCodex.name}
            </Heading>
          }
        >
          <LinearGradient
            colors={['$primary500', '$secondary500']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            as={ExpoLinearGradient}
            style={{
              height: 50,
              width: '100%'
            }}
          />
        </MaskedView>
      </VStack>
      <VStack>
        <Box h={92}>
          <FlatList
            data={codexes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Box p='$2' />}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setSelectedIndex(index)
                }}
                ml={index === 0 ? '$4' : 0}
                mr={index === codexes.length - 1 ? '$4' : 0}
              >
                <Card
                  gradient={selectedIndex === index ? 'primary' : 'secondary'}
                  alignItems='center'
                  bg='$white'
                  h={90}
                  justifyContent='center'
                  key={item.id}
                  w={90}
                >
                  <ArmyIcon
                    codexName={item.name}
                    w={45}
                    h={45}
                  />
                </Card>
              </Pressable>
            )}
          />
        </Box>
        <VStack p='$4'>
          <Button
            disabled={
              !AVAILABLED_ARMIES.some((army) => army === selectedCodex.name)
            }
            onPress={startBuilding}
            text='Start building'
          />
        </VStack>
      </VStack>
    </VStack>
  )
}

export default CodexSelectionScreen
