import { Canvas, RoundedRect, Shadow } from '@shopify/react-native-skia'
import clsx from 'clsx'
import { memo, useCallback, useState, type PropsWithChildren } from 'react'
import { View, type LayoutChangeEvent, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { selectThemeName } from '../store'
import { themeColors } from '../ui'

type InsetShadowProps = PropsWithChildren<{
  borderRadius?: number
  className?: string
}>

const InsetShadow = ({
  children,
  className,
  borderRadius = 16
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
  const theme = useSelector(selectThemeName)
  const color = themeColors[theme].primary[800]

  return (
    <View
      className={clsx('w-full', className)}
      onLayout={onLayout}
      collapsable={false}
    >
      <Canvas
        style={[styles.canvas, { width, height }]}
        pointerEvents='none'
      >
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={borderRadius}
          color={color}
        >
          <Shadow
            dx={0}
            dy={0}
            blur={4}
            color='#222'
            inner
          />
        </RoundedRect>
      </Canvas>

      <View className='z-10'>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1
  }
})

export default memo(InsetShadow)
