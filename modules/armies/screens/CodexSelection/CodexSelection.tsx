import {
  AnimatedArmyIcon,
  ArmyIcon,
  Button,
  GradientHeading,
  Header,
  LinearGradient,
  Loading
} from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
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
      <Box className='h-full absolute w-full'>
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
        className={` pt-${insets.top} pb-${insets.bottom} h-full absolute w-full `}
      >
        <VStack className='p-4'>
          <Header
            title=''
            left={{
              href: '../',
              Icon: ChevronLeft
            }}
          />
        </VStack>
        <AnimatedArmyIcon codexName={selectedCodex.name} />
        <VStack className='justify-end p-4 items-center'>
          <Box className='items-center bg-secondary-50 border-secondary-700 rounded-xl border-1 px-8'>
            <Text
              bold
              size='xl'
              className='text-secondary-700 tracking-xl leading-xl'
            >
              Codex
            </Text>
          </Box>
          <GradientHeading>{selectedCodex.name}</GradientHeading>
        </VStack>
        <VStack>
          <Box className='h-[92px]'>
            <FlatList
              data={codexes}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <Box className='p-2' />}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => {
                    onPressItem(index)
                  }}
                  className={` ${index === codexes.length - 1 ? 'mr-4' : 'mr-[0px]'} ${index === 0 ? 'ml-4' : 'ml-[0px]'} `}
                >
                  <VStack
                    key={item.id}
                    className={` ${selectedCodex.id === item.id ? 'opacity-100' : 'opacity-60'} ${selectedCodex.id === item.id ? 'bg-secondary-100' : 'bg-secondary-50'} items-center rounded-2xl h-[90px] justify-center w-[90px] `}
                  >
                    <ArmyIcon
                      codexName={item.name}
                      w={45}
                      h={45}
                    />
                  </VStack>
                </Pressable>
              )}
            />
          </Box>
          <VStack className='p-4'>
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
