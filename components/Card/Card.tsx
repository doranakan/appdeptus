import { LinearGradient, VStack, type HStack } from '@gluestack-ui/themed'
import { config, useColorMode } from 'appdeptus/designSystem'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { useMemo, type PropsWithChildren } from 'react'

type CardProps = (typeof HStack)['defaultProps'] & {
  gradient?: 'primary' | 'secondary'
}

const Card = ({
  children,
  gradient = 'secondary',
  ...props
}: PropsWithChildren<CardProps>) => {
  const colorMode = useColorMode()

  const colors = useMemo(() => {
    const color =
      colorMode === 'light'
        ? config.tokens.colors
        : config.themes[colorMode].colors

    return [
      color[`${gradient}200`],
      color[`${gradient}400`],
      color[`${gradient}100`]
    ]
  }, [colorMode, gradient])

  return (
    <LinearGradient
      p={1}
      colors={colors}
      start={0}
      end={1}
      as={ExpoLinearGradient}
    >
      <VStack
        bg='$secondary100'
        p='$2'
        {...props}
      >
        {children}
      </VStack>
    </LinearGradient>
  )
}

export default Card
