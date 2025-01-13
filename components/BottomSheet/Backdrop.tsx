import { type BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { Pressable } from '../ui'

type BackdropProps = BottomSheetBackdropProps & {
  onPress?: () => void
}

const Backdrop = ({ animatedIndex, onPress }: BackdropProps) => {
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 1])
  }))
  return (
    <Animated.View
      className='absolute h-full w-full bg-primary-950/60'
      style={style}
    >
      <Pressable
        className='flex-1'
        onPress={onPress}
      />
    </Animated.View>
  )
}

export default Backdrop
