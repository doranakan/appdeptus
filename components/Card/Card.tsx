import clsx from 'clsx'
import { LinearGradient } from 'expo-linear-gradient'
import { memo, type PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import InnerBorder from '../InnerBorder'
import { selectThemeName } from '../store'
import { themeColors, VStack } from '../ui'

type CardProps = PropsWithChildren<{
  variant?:
    | 'default'
    | 'disabled'
    | 'selectable'
    | 'selectable-alt'
    | 'selected'
}>

const Card = ({ children, variant = 'default' }: CardProps) => {
  const themeName = useSelector(selectThemeName)

  return (
    <VStack
      className={clsx([
        'w-full rounded-3xl bg-primary-700',
        variantToShadow[variant]
      ])}
    >
      <InnerBorder
        opacity={
          variant === 'selected' || variant === 'selectable'
            ? 'opacity-40'
            : undefined
        }
        selected={variant === 'selected'}
      >
        <LinearGradient
          colors={[
            themeColors[themeName].primary[700],
            themeColors[themeName].primary[950]
          ]}
          start={{ x: 0.3, y: 1 }}
          end={{ x: 1, y: 3 }}
        >
          {variant === 'selectable' ? (
            <VStack
              className='absolute h-full w-full bg-secondary-950/60'
              pointerEvents='none'
            />
          ) : undefined}
          {children}
        </LinearGradient>
        {variant === 'disabled' ? (
          <VStack
            className='absolute h-full w-full bg-primary-950/70'
            pointerEvents='none'
          />
        ) : undefined}
        {variant === 'selectable-alt' ? (
          <VStack
            className='absolute h-full w-full bg-secondary-950/50'
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
  'selectable-alt': 'shadow-sm',
  selected: 'shadow-xl'
} as const satisfies Record<NonNullable<CardProps['variant']>, string>

export default memo(Card)
