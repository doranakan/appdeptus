import clsx from 'clsx'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { memo, type PropsWithChildren } from 'react'
import { Platform } from 'react-native'
import { useSelector } from 'react-redux'
import InnerBorder from '../InnerBorder'
import { selectThemeName } from '../store'
import { themeColors, VStack } from '../ui'

type CardProps = PropsWithChildren<{
  mode?: 'blur' | 'gradient'
  variant?: 'default' | 'disabled' | 'selectable' | 'selected'
}>

const Card = ({
  children,
  mode = 'gradient',
  variant = 'default'
}: CardProps) => {
  const themeName = useSelector(selectThemeName)

  return (
    <VStack
      className={clsx([
        'w-full rounded-3xl bg-primary-700/10',
        variantToShadow[variant]
      ])}
    >
      <InnerBorder
        opacity={variant === 'selected' ? 'opacity-40' : undefined}
        selected={variant === 'selected'}
      >
        {mode === 'gradient' ? (
          <LinearGradient
            colors={[
              themeColors[themeName].primary[700],
              themeColors[themeName].primary[950]
            ]}
            start={{ x: 0.3, y: 1 }}
            end={{ x: 1, y: 3 }}
          >
            {children}
          </LinearGradient>
        ) : (
          <BlurView
            intensity={Platform.OS === 'android' ? 40 : 10}
            tint='regular'
          >
            {children}
          </BlurView>
        )}
        {variant === 'disabled' ? (
          <VStack
            className='absolute h-full w-full bg-primary-950/70'
            pointerEvents='none'
          />
        ) : undefined}
        {variant === 'selectable' ? (
          <VStack
            className='absolute h-full w-full bg-secondary-950/20'
            pointerEvents='none'
          />
        ) : undefined}
      </InnerBorder>
    </VStack>
  )
}

const variantToShadow = {
  default: 'shadow-lg',
  disabled: 'shadow-sm',
  selectable: 'shadow-sm',
  selected: 'shadow-xl'
} as const satisfies Record<NonNullable<CardProps['variant']>, string>

export default memo(Card)
