import { type Army } from 'appdeptus/models'
import React, { memo, useMemo } from 'react'
import { themeColors, VStack } from '../ui'
import UnitListItem from '../UnitListItem'
import TopContainer from 'appdeptus/modules/armies/screens/Army/TopContainer'
import { ArmyBackground, NavigationHeader, Text } from 'appdeptus/components'
import ref from 'appdeptus/modules/armies/screens/Army/ref'
import { EllipsisVertical } from 'lucide-react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { Dimensions, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

type UnitRosterProps = {
  army: Army
}

const { height: screenHeight } = Dimensions.get('window')

const UnitRoster = ({ army }: UnitRosterProps) => {
  const items = useMemo(
    () =>
      army.roster.map((item, index) => (
        <UnitListItem
          item={item}
          warlord={index === 0}
          key={
            item.type === 'embarked' || item.type === 'team'
              ? item.id
              : item.selectionId
          }
        />
      )),
    [army.roster]
  )

  const headerY = useSharedValue(0)
  const bgY = useSharedValue(0)

  const rOpacity = useAnimatedStyle(() => {
    console.log(bgY.value)

    return {
      opacity: interpolate(
        bgY.value,
        [screenHeight * 0.5, 0],
        [1, 0],
        Extrapolation.CLAMP
      )
    }
  })

  const { top } = useSafeAreaInsets()
  const handler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      headerY.value = contentOffset.y
      bgY.value = contentOffset.y * 0.5
    }
  })
  const rHeaderStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerY.value }]
  }))
  const rBgStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bgY.value }]
  }))

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handler}
    >
      <Animated.View
        className='absolute z-20 h-full w-full'
        style={rHeaderStyle}
      >
        <LinearGradient
          colors={[
            `${themeColors[army.codex.name].primary[950]}00`,
            themeColors[army.codex.name].primary[950]
          ]}
          style={styles.gradient}
        />
      </Animated.View>
      <Animated.View
        className='absolute z-40 w-full px-4'
        style={rHeaderStyle}
      >
        <VStack style={{ height: top }} />
        <NavigationHeader
          variant='backButton'
          rightButton={{
            onPress: () => ref.current?.present(),
            variant: 'callback',
            icon: EllipsisVertical
          }}
        />
      </Animated.View>

      <VStack
        className='z-10 w-full'
        style={rBgStyle}
      >
        <Animated.View style={[{ height: screenHeight / 2 }, rBgStyle]}>
          <ArmyBackground
            codex={army.codex.name}
            animatedOpacity={rOpacity}
          />
        </Animated.View>
      </VStack>
      <VStack className='z-30 gap-4 px-4 pb-4'>
        <VStack
          className='py-4'
          space='md'
        >
          <TopContainer army={army} />
          <Text
            className='uppercase'
            family='body-bold'
          >
            units
          </Text>
        </VStack>
        {items}
      </VStack>
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  }
})

export default memo(UnitRoster)
