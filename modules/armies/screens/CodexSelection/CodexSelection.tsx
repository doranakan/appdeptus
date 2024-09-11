import { Box, Pressable, Text, VStack } from '@gluestack-ui/themed'
import {
  AnimatedArmyIcon,
  ArmyIcon,
  Button,
  Card,
  GradientHeading,
  Header,
  LinearGradient,
  Loading
} from 'appdeptus/components'
import { useArmyTintEffect } from 'appdeptus/designSystem'
import { type ArmyForm, type Codex } from 'appdeptus/models'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ChevronLeft } from 'lucide-react-native'
import { useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetCodexesQuery } from '../../api'
import { CodexCoverImage } from '../../components'

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
        opacity={1}
      />

      <Box
        h='$full'
        position='absolute'
        w='$full'
      >
        <LinearGradient
          colors={[
            '$secondary700',
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.8)',
            '$white'
          ]}
        />
      </Box>
      <VStack
        h='$full'
        pb={insets.bottom}
        pt={insets.top}
        position='absolute'
        w='$full'
      >
        <VStack p='$4'>
          <Header
            title=''
            left={{
              href: '../',
              Icon: ChevronLeft
            }}
          />
        </VStack>
        <AnimatedArmyIcon codexName={selectedCodex.name} />
        <VStack
          justifyContent='flex-end'
          p='$4'
          alignItems='center'
        >
          <Box
            alignItems='center'
            bg='$secondary50'
            borderColor='$secondary700'
            borderRadius='$xl'
            borderWidth='$1'
            px='$8'
          >
            <Text
              bold
              color='$secondary700'
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
                    alignItems='center'
                    bg={
                      selectedCodex.id === item.id
                        ? '$secondary100'
                        : '$secondary50'
                    }
                    h={90}
                    justifyContent='center'
                    key={item.id}
                    opacity={selectedCodex.id === item.id ? '$100' : '$60'}
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
            <Pressable onPress={startBuilding}>
              <Button text='Start building' />
            </Pressable>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default CodexSelectionScreen
