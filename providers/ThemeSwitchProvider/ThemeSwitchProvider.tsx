import { Canvas, Image, makeImageFromView, type SkImage } from '@shopify/react-native-skia'
import { type PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react'
import ThemeSwitchContext from './ThemeSwitchContext'
import { type ThemeName, VStack } from 'appdeptus/components'
import { PixelRatio, StyleSheet, type View } from 'react-native'

const ratio = PixelRatio.get()

const ThemeSwitchProvider = ({ children }: PropsWithChildren) => {
  const [image, setImage] = useState<SkImage | null>(null)
  const wrapperRef = useRef<View>(null)

  const switchTheme = useCallback(async (theme: ThemeName, tapCoordinates: { x: number, y: number }) => {
    const snapshot = await makeImageFromView(wrapperRef)
    console.log('tapped', { tapCoordinates })
    setImage(snapshot)
  }, [])

  const value = useMemo(() => ({ switchTheme }), [switchTheme])

  return (
    <ThemeSwitchContext.Provider value={value}>
      {image ? (
        <Canvas style={styles.canvas}>
          <Image
            image={image}
            height={image.height() / ratio}
            width={image.width() / ratio}
            x={0}
            y={0}
          />
        </Canvas>
      ) : null}
      <VStack
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
    zIndex: 1000,
    borderColor: 'red',
    borderWidth: 1
  }
})
export default ThemeSwitchProvider
