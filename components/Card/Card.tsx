import { VStack, type HStack } from '@gluestack-ui/themed'
import { config, useColorMode } from 'appdeptus/designSystem'
import { MotiView } from 'moti'
import { useMemo, type PropsWithChildren } from 'react'
import LinearGradient from '../LinearGradient'

type CardProps = (typeof HStack)['defaultProps'] & {
  animated?: boolean
  gradient?: 'primary' | 'secondary'
}

const Card = ({
  animated,
  gradient = 'secondary',
  opacity,
  ...props
}: PropsWithChildren<CardProps>) => {
  const colorMode = useColorMode()

  const colors = useMemo(() => {
    const color =
      colorMode === 'light'
        ? config.tokens.colors
        : config.themes[colorMode].colors

    return [
      color[`${gradient}400`],
      color[`${gradient}200`],
      color[`${gradient}100`]
    ]
  }, [colorMode, gradient])

  return (
    <VStack opacity={opacity}>
      <LinearGradient
        p={1}
        colors={colors}
        start={0.2}
        end={1}
        height='auto'
      >
        {animated ? (
          <MotiView
            animate={{
              backgroundColor:
                colorMode === 'light'
                  ? config.tokens.colors.secondary50
                  : config.themes[colorMode].colors.secondary100
            }}
            transition={{
              duration: 500
            }}
          >
            <Content
              {...props}
              bg='$transparent'
            />
          </MotiView>
        ) : (
          <Content {...props} />
        )}
      </LinearGradient>
    </VStack>
  )
}

const Content = ({
  children,
  ...props
}: Omit<CardProps, 'gradient' | 'animated'>) => (
  <VStack
    bg='$secondary100'
    p='$2'
    {...props}
  >
    {children}
  </VStack>
)

export default Card
