import { Box, HStack, Icon, Pressable, VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import {
  AnimatedArmyBackgroundImage,
  LinearGradient,
  Loading
} from 'appdeptus/components'
import { config, setColorMode, useColorMode } from 'appdeptus/designSystem'
import { Link, useLocalSearchParams } from 'expo-router'
import { Edit, Trash2 } from 'lucide-react-native'
import { MotiView, motify } from 'moti'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useGetArmyQuery } from '../../api'
import Header from './Header'
import Item from './Item'

const AnimatedHStack = motify(HStack)()

const ArmyScreen = () => {
  const dispatch = useDispatch()

  const { armyId } = useLocalSearchParams<{ armyId: string }>()

  const { data: army } = useGetArmyQuery(armyId ?? skipToken)

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

  useEffect(() => {
    if (army) {
      dispatch(setColorMode(army.codex.name))
    }
  })

  if (!army) {
    return <Loading />
  }

  return (
    <>
      <VStack
        h='$full'
        position='absolute'
        width='$full'
      >
        <AnimatedArmyBackgroundImage
          codexName={army.codex.name}
          duration={200}
          fromScale={1.1}
          opacity={0.3}
        />
        <Box
          h='$full'
          position='absolute'
          w='$full'
        >
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
        justifyContent='flex-end'
        opacity={0.6}
        pb='$4'
        pt={insets.top}
        px='$4'
        style={animatedStyle}
      >
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
              color='$white'
              size='xl'
            />
          </Pressable>
        </Link>
        <Pressable>
          <Icon
            as={Trash2}
            color='$white'
            size='xl'
          />
        </Pressable>
      </AnimatedHStack>
      <Animated.FlatList
        data={army.units}
        ItemSeparatorComponent={() => <Box h='$4' />}
        keyExtractor={({ id }, index) => `${id}-${index}`}
        ListHeaderComponent={() => <Header army={army} />}
        ListFooterComponent={() => <Box height='$8' />}
        onScroll={scrollHandler}
        renderItem={({ item: unit, index }) => (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 200 + 150 * index,
              duration: 400
            }}
          >
            <Item
              armyId={army.id}
              unit={unit}
            />
          </MotiView>
        )}
        style={styles.flatList}
      />
    </>
  )
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    padding: 16
  }
})

export default ArmyScreen
