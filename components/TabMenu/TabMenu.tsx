import { useCallback, useEffect, useMemo, useState } from 'react'
import { type LayoutChangeEvent, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import InnerBorder from '../InnerBorder'
import InsetShadow from '../InsetShadow'
import TabMenuItem from './TabMenuItem'

type TabMenuProps<T extends string> = {
  options: readonly T[]
  onOptionSelected: (opt: T) => void
}

const TabMenu = <T extends string>({
  options,
  onOptionSelected
}: TabMenuProps<T>) => {
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

  const style = useMemo(
    () => ({
      width: (wrapperWidth - 16) / options.length
    }),
    [options.length, wrapperWidth]
  )

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

  const selectorStyle = useMemo(() => [style, rStyle], [rStyle, style])

  const items = useMemo(
    () =>
      options.map((opt, idx) => (
        <TabMenuItem
          key={opt}
          onPress={() => {
            setSelectedIndex(idx)
          }}
          option={opt}
          isSelected={selectedIndex === idx}
        />
      )),
    [options, selectedIndex]
  )

  return (
    <InsetShadow
      borderRadius={24}
      className='rounded-3xl'
    >
      <View
        className='z-10 w-full flex-row items-center rounded-3xl bg-primary-800 p-2'
        onLayout={onLayout}
      >
        {items}
        <Animated.View
          pointerEvents='none'
          className='absolute -z-10 h-full rounded-2xl bg-primary-950 shadow'
          style={selectorStyle}
        >
          <InnerBorder rounded='rounded-2xl'>
            <View className='h-full w-full' />
          </InnerBorder>
        </Animated.View>
      </View>
    </InsetShadow>
  )
}

export default TabMenu
