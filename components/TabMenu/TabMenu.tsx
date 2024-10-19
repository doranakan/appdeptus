import { type LayoutChangeEvent, StyleSheet, View } from 'react-native'
import TabMenuItem from './TabMenuItem'
import { useCallback, useEffect, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import InnerBorder from '../InnerBorder'

type TabMenuProps = {
  options: string[]
  onOptionSelected: (opt: string) => void
}

const TabMenu = ({ options, onOptionSelected }: TabMenuProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [wrapperWidth, setWrapperWidth] = useState(0)
  const translationX = useSharedValue(0)
  useEffect(() => {
    const selectedOption = options.at(selectedIndex)
    if (!selectedOption) {
      return
    }
    translationX.value =
      8 + ((wrapperWidth - 16) / options.length) * selectedIndex
    onOptionSelected(selectedOption)
  }, [onOptionSelected, options, selectedIndex, translationX, wrapperWidth])

  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width }
      }
    }: LayoutChangeEvent) => {
      setWrapperWidth(width)
    },
    []
  )

  const style = {
    width: (wrapperWidth - 16) / options.length
  }
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translationX.value, {
          stiffness: 130,
          damping: 19
        })
      }
    ]
  }))

  return (
    <View
      className='w-full flex-row items-center rounded-3xl bg-primary-800 p-2'
      onLayout={onLayout}
    >
      {options.map((opt, idx) => (
        <TabMenuItem
          key={opt}
          onPress={() => {
            setSelectedIndex(idx)
          }}
          option={opt}
          isSelected={selectedIndex === idx}
        />
      ))}
      <Animated.View
        pointerEvents='none'
        className='absolute -z-10 h-full rounded-2xl bg-primary-950'
        style={[style, rStyle]}
      >
        <InnerBorder rounded='rounded-2xl'>
          <View className='h-full w-full' />
        </InnerBorder>
      </Animated.View>
    </View>
  )
}

export default TabMenu
