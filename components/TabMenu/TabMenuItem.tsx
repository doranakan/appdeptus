import { Pressable } from 'react-native'
import Text from '../Text'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { selectThemeName } from '../store'
import { themeColors } from '../ui'
import { useEffect } from 'react'

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

  const color = useSharedValue(isSelected ? 1 : 0)
  useEffect(() => {
    if (isSelected) {
      color.value = withTiming(1, { duration: 200 })
    } else {
      color.value = withTiming(0, { duration: 200 })
    }
  })

  const rStyle = useAnimatedStyle(() => ({
    color: interpolateColor(color.value, [0, 1], [inactiveColor, selectedColor])
  }))

  return (
    <Pressable
      className='flex-1 items-center justify-center rounded-2xl px-4 py-2 shadow-soft-1'
      onPress={() => {
        onPress(option)
      }}
    >
      <AnimatedText
        className='text-sm uppercase'
        family='body-bold'
        style={rStyle}
      >
        {option}
      </AnimatedText>
    </Pressable>
  )
}

export default TabMenuItem
