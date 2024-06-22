import {
  Box,
  Heading,
  LinearGradient,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import { codexSelectionMask } from 'appdeptus/assets'
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
import { FlatList } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { useGetCodexesQuery } from '../../api'

const AVAILABLED_ARMIES = [CodexName.TYRANIDS]

const CodexSelectionScreen = () => {
  const router = useRouter()

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
        codexId: selectedCodex?.id
      },
      pathname: './unit-selection'
    })
  }, [reset, router, selectedCodex])

  if (!codexes || !selectedCodex) {
    return <Loading />
  }

  return (
    <VStack>
      <ArmyBackgroundImage
        codexName={selectedCodex.name}
        opacity={0.2}
      />
      <Box
        h='$full'
        position='absolute'
        w='$full'
      >
        <LinearGradient
          colors={['$white', 'rgba(255,255,255,0)']}
          start={0}
          end={1}
          as={ExpoLinearGradient}
          style={{
            height: '100%',
            width: '100%'
          }}
        />
      </Box>
      <VStack
        h='$full'
        position='absolute'
        w='$full'
      >
        <VStack flex={1}>
          <MaskedView
            style={{
              position: 'absolute',
              flexDirection: 'row',
              height: '100%'
            }}
            maskElement={
              <Box flex={1}>
                <SvgXml xml={codexSelectionMask} />
              </Box>
            }
          >
            <ArmyBackgroundImage codexName={selectedCodex.name} />
          </MaskedView>
        </VStack>
        <VStack
          justifyContent='flex-end'
          p='$4'
          alignItems='center'
        >
          <Box
            alignItems='center'
            borderColor='$dark900'
            borderWidth='$1'
            px='$8'
          >
            <Text
              size='xl'
              textTransform='uppercase'
            >
              Codex
            </Text>
          </Box>

          <MaskedView
            style={{ flexDirection: 'row', height: 50 }}
            maskElement={
              <Heading
                alignSelf='center'
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
                    gradient={
                      selectedCodex.id === item.id ? 'primary' : 'secondary'
                    }
                    alignItems='center'
                    bg={selectedCodex.id === item.id ? '$primary50' : '$white'}
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
    </VStack>
  )
}

export default CodexSelectionScreen
