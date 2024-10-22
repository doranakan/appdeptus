import { memo, useCallback, useState, type PropsWithChildren } from 'react'
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
      className={clsx('w-full', className)}
      onLayout={onLayout}
    >
      <View
        pointerEvents='none'
        style={styles.canvas}
      >
        <Canvas style={{ width, height }}>
          <Box
            box={rrect(rect(0, 0, width, height), borderRadius, borderRadius)}
            color='transparent'
          >
            <BoxShadow
              dx={0}
              dy={1}
              blur={3}
              color='#222'
              inner
            />
          </Box>
        </Canvas>
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10
  }
})

export default memo(InsetShadow)
