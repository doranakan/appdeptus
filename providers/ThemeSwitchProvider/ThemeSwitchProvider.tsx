import {
  Canvas,
  Circle,
  Group,
  Image,
  makeImageFromView,
  Mask,
  type SkImage
} from '@shopify/react-native-skia'
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition
} from 'react'
import ThemeSwitchContext from './ThemeSwitchContext'
import { setTheme, type ThemeName, VStack } from 'appdeptus/components'
import { PixelRatio, StyleSheet, useWindowDimensions, type View } from 'react-native'
import { Easing, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated'
import { useAppDispatch } from 'appdeptus/store'

const ratio = PixelRatio.get()

const ThemeSwitchProvider = ({ children }: PropsWithChildren) => {
  const [image, setImage] = useState<SkImage | null>(null)
  const wrapperRef = useRef<View>(null)
  const [circleCoords, setCircleCoords] = useState({ x: 0, y: 0 })
  const { height } = useWindowDimensions()
  const dispatch = useAppDispatch()
  const [, start] = useTransition()
  const radius = useSharedValue(0)

  const reset = useCallback(() => {
    start(() => {
      setImage(null)
    })
    start(() => {
      radius.value = 0
    })
  }, [radius])

  useEffect(() => {
    if (image) {
      radius.value = withTiming(height, { duration: 500, easing: Easing.ease }, (finished) => {
        if (finished) {
          runOnJS(reset)()
        }
      })
    }
  }, [height, image, radius, reset])

  const dispatchChangeThemeAction = useCallback((theme: ThemeName) => dispatch(setTheme(theme)), [dispatch])
  const switchTheme = useCallback(
    async (theme: ThemeName, tapCoordinates: { x: number, y: number }) => {
      const snapshot = await makeImageFromView(wrapperRef)
      setCircleCoords(tapCoordinates)
      setImage(snapshot)
      runOnJS(dispatchChangeThemeAction)(theme)
    },
    [dispatchChangeThemeAction]
  )

  const value = useMemo(() => ({ switchTheme }), [switchTheme])

  return (
    <ThemeSwitchContext.Provider value={value}>
      {image ? (
        <Canvas style={styles.canvas}>
          <Mask
            mode='luminance'
            mask={
              <Group>
                <Circle cx={circleCoords.x} cy={circleCoords.y} r={height} color="white" />
                <Circle cx={circleCoords.x} cy={circleCoords.y} r={radius} color="black" />
              </Group>
            }
          >
            <Image
              image={image}
              height={image.height() / ratio}
              width={image.width() / ratio}
              x={0}
              y={0}
            />
          </Mask>
        </Canvas>
      ) : null}
      <VStack
        collapsable={false}
        className='flex-1'
        ref={wrapperRef}
      >
        {children}
      </VStack>
    </ThemeSwitchContext.Provider>
  )
}

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1000
  }
})
export default ThemeSwitchProvider
