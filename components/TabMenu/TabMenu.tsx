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

type TabMenuProps<T extends Readonly<string>> = {
  options: T[]
  onOptionSelected: (opt: T, index: number) => void
}

const TabMenu = <T extends Readonly<string>>({
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
    onOptionSelected(selectedOption, selectedIndex)
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

  return (
    <InsetShadow borderRadius={22}>
      <View
        className='w-full flex-row items-center rounded-3xl p-2'
        onLayout={onLayout}
      >
        {options.map((opt, idx) => (
          <TabMenuItem
            key={`${opt}-${idx}`}
            onPress={() => {
              setSelectedIndex(idx)
            }}
            option={opt}
            isSelected={selectedIndex === idx}
          />
        ))}
        <Animated.View
          pointerEvents='none'
          className='absolute h-full rounded-2xl bg-primary-950 shadow'
          style={[selectorStyle, { zIndex: 2 }]}
        >
          <InnerBorder rounded='2xl'>
            <View className='h-full w-full' />
          </InnerBorder>
        </Animated.View>
      </View>
    </InsetShadow>
  )
}

export default TabMenu
