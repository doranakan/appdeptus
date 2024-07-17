import { Box, Pressable, Text, VStack } from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import { codexSelectionMask } from 'appdeptus/assets'
import {
  AnimatedArmyBackgroundImage,
  ArmyIcon,
  Button,
  Card,
  GradientHeading,
  Loading
} from 'appdeptus/components'
import { useArmyTintEffect } from 'appdeptus/designSystem'
import { CodexName, type ArmyForm, type Codex } from 'appdeptus/models'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import { useGetCodexesQuery } from '../../api'
import { CodexCoverImage } from '../../components'

const AVAILABLED_ARMIES = [CodexName.AELDARI, CodexName.TYRANIDS]

const CodexSelectionScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { data } = useGetCodexesQuery()

  const selectedCodex = useMemo(
    () => data?.[selectedIndex],
    [data, selectedIndex]
  )

  if (!data || !selectedCodex) {
    return <Loading />
  }

  return (
    <CodexSelectionContent
      codexes={data}
      selectedCodex={selectedCodex}
      onPressItem={setSelectedIndex}
    />
  )
}

type CodexSelectionContentProps = {
  codexes: Codex[]
  onPressItem: (index: number) => void
  selectedCodex: Codex
}

const CodexSelectionContent = ({
  codexes,
  onPressItem,
  selectedCodex
}: CodexSelectionContentProps) => {
  const insets = useSafeAreaInsets()

  useArmyTintEffect(selectedCodex.name)

  const { reset, setValue } = useFormContext<ArmyForm>()

  const startBuilding = useCallback(() => {
    reset()

    setValue('codexId', selectedCodex?.id ?? '')

    router.push({
      params: {
        codexId: selectedCodex?.id
      },
      pathname: 'army-builder/unit-selection'
    })
  }, [reset, selectedCodex?.id, setValue])

  return (
    <VStack>
      <StatusBar
        animated
        style='light'
      />
      <CodexCoverImage
        animated
        codexName={selectedCodex.name}
      />
      <VStack
        h='$full'
        pb={insets.bottom}
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
            <Box
              bg='$black'
              h='$full'
              w='$full'
            />
            <Box
              position='absolute'
              h='$full'
              w='$full'
            >
              <AnimatedArmyBackgroundImage codexName={selectedCodex.name} />
            </Box>
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
              bold
              letterSpacing='$xl'
              lineHeight='$xl'
              size='xl'
            >
              Codex
            </Text>
          </Box>
          <GradientHeading>{selectedCodex.name}</GradientHeading>
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
                    onPressItem(index)
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
