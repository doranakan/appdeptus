import { useCallback, useState, type PropsWithChildren } from 'react'
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { Canvas, Box, BoxShadow, rect, rrect } from '@shopify/react-native-skia'
import clsx from 'clsx'

type InsetShadowProps = PropsWithChildren<{
  className?: string
  borderRadius: number
}>

const InsetShadow = ({
  children,
  className,
  borderRadius
}: InsetShadowProps) => {
  const [{ width, height }, setWrapperDimensions] = useState({
    width: 0,
    height: 0
  })
  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width, height }
      }
    }: LayoutChangeEvent) => {
      setWrapperDimensions({ width, height })
    },
    []
  )
  return (
    <View
      className={clsx('h-full w-full', className)}
      onLayout={onLayout}
    >
      <Canvas style={[styles.canvas, { width, height }]}>
        <Box
          box={rrect(rect(0, 0, width, height), borderRadius, borderRadius)}
          color='transparent'
        >
          <BoxShadow
            dx={-1}
            dy={-1}
            blur={8}
            color='#262626'
            inner
          />
        </Box>
      </Canvas>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none'
  }
})

export default InsetShadow
