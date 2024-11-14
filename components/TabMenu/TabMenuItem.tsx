import { memo, useCallback, useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { selectThemeName } from '../store'
import Text from '../Text'
import { themeColors } from '../ui'

type TabMenuItemProps = {
  option: string
  isSelected: boolean
  onPress: (option: string) => void
}

const AnimatedText = Animated.createAnimatedComponent(Text)

const TabMenuItem = ({ isSelected, option, onPress }: TabMenuItemProps) => {
  const codex = useSelector(selectThemeName)
  const selectedColor = themeColors[codex].primary[50]
  const inactiveColor = themeColors[codex].primary[300]

  const color = useSharedValue(0)
  useEffect(() => {
    if (isSelected) {
      color.value = withTiming(1, { duration: 200 })
    } else {
      color.value = withTiming(0, { duration: 200 })
    }
  }, [color, isSelected])

  const rStyle = useAnimatedStyle(() => ({
    color: interpolateColor(color.value, [0, 1], [inactiveColor, selectedColor])
  }))
  const pressHandler = useCallback(() => {
    onPress(option)
  }, [onPress, option])

  return (
    <Pressable
      className='flex-1 items-center justify-center rounded-2xl px-4 py-2'
      onPress={pressHandler}
    >
      <AnimatedText
        className='text-ellipsis text-sm uppercase'
        numberOfLines={1}
        family='body-bold'
        style={rStyle}
      >
        {option}
      </AnimatedText>
    </Pressable>
  )
}

export default memo(TabMenuItem)
