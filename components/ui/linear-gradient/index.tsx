'use client'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { cssInterop } from 'nativewind'
import React, { type ComponentProps } from 'react'

type LinearGradientProps = {
  className?: string
  from: `bg-${string}`
  to: `bg-${string}`
} & Omit<ComponentProps<typeof ExpoLinearGradient>, 'colors'>

const LinearGradient = ({
  className,
  from,
  to,
  ...props
}: LinearGradientProps) => (
  <ExpoLinearGradient
    {...props}
    className={className}
    colors={[
      (from as unknown as { backgroundColor: string }).backgroundColor,
      (to as unknown as { backgroundColor: string }).backgroundColor
    ]}
  />
)

cssInterop(ExpoLinearGradient, {
  className: 'style'
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
cssInterop(LinearGradient, {
  from: {
    target: 'from',
    nativeStyleToProp: {
      color: true
    }
  },
  to: {
    target: 'to',
    nativeStyleToProp: {
      color: true
    }
  }
})

export { LinearGradient }
