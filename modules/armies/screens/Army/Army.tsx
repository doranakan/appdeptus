import { skipToken } from '@reduxjs/toolkit/query'
import {
  AnimatedArmyBackgroundImage,
  LinearGradient,
  Loading
} from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { VStack } from 'appdeptus/components/ui/vstack'
import { config, useArmyTintEffect, useColorMode } from 'appdeptus/designSystem'
import { type Army } from 'appdeptus/models'
import { Link, useLocalSearchParams } from 'expo-router'
import { ChevronLeft, Edit } from 'lucide-react-native'
import { MotiView, motify } from 'moti'
import {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetArmyQuery } from '../../api'
import { UnitList } from '../../components'
import Header from './Header'

const AnimatedHStack = motify(HStack)()

const ArmyScreen = () => {
  const { armyId } = useLocalSearchParams<{ armyId: string }>()

  const { data: army } = useGetArmyQuery(armyId ?? skipToken)

  if (!army) {
    return <Loading />
  }

  return <ArmyContent army={army} />
}

type ArmyProps = {
  army: Army
}

const ArmyContent = ({ army }: ArmyProps) => {
  useArmyTintEffect(army.codex.name)

  const insets = useSafeAreaInsets()

  const offset = useSharedValue(0)

  const colorMode = useColorMode()

  const scrollHandler = useAnimatedScrollHandler((e) => {
    offset.value = e.contentOffset.y
  })

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      offset.value,
      [0, 50],
      [
        'transparent',
        colorMode === 'light'
          ? config.tokens.colors.primary700
          : config.themes[colorMode].colors.primary700
      ]
    ),
    borderBottomWidth: interpolate(
      offset.value,
      [0, 50],
      [0, 1],
      Extrapolation.CLAMP
    )
  }))

  return (
    <>
      <VStack className='h-full absolute w-full'>
        <AnimatedArmyBackgroundImage
          codexName={army.codex.name}
          duration={200}
          fromScale={1.1}
          opacity={0.3}
        />
        <Box className='h-full absolute w-full'>
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 300 }}
          >
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.2)',
                colorMode === 'light'
                  ? config.tokens.colors.secondary700
                  : config.themes[colorMode].colors.secondary700
              ]}
            />
          </MotiView>
        </Box>
      </VStack>
      <AnimatedHStack
        borderColor='$primary800'
        gap='$8'
        justifyContent='space-between'
        opacity={0.6}
        pb='$4'
        pt={insets.top}
        px='$4'
        style={animatedStyle}
      >
        <Link
          asChild
          href='../'
        >
          <Pressable>
            <Icon
              as={ChevronLeft}
              size='xl'
              className='text-white'
            />
          </Pressable>
        </Link>
        <Link
          asChild
          href={{
            params: { armyId: army.id, codexId: army.codex.id },
            pathname: 'army-builder/unit-selection'
          }}
        >
          <Pressable>
            <Icon
              as={Edit}
              size='xl'
              className='text-white'
            />
          </Pressable>
        </Link>
      </AnimatedHStack>
      <UnitList
        army={army}
        ListHeaderComponent={() => <Header army={army} />}
        onScroll={scrollHandler}
      />
    </>
  )
}

export default ArmyScreen
