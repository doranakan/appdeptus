import { VStack, type HStack } from '@gluestack-ui/themed'
import { config, useColorMode } from 'appdeptus/designSystem'
import { MotiView } from 'moti'
import { type PropsWithChildren } from 'react'

type CardProps = (typeof HStack)['defaultProps'] & {
  animated?: boolean
}

const Card = ({
  animated,
  bg,
  opacity,
  ...props
}: PropsWithChildren<CardProps>) => {
  const colorMode = useColorMode()

  return (
    <VStack
      borderRadius='$2xl'
      overflow='hidden'
      opacity={opacity}
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
            bg={bg ?? '$secondary50'}
          />
        </MotiView>
      ) : (
        <Content
          {...props}
          bg={bg ?? '$secondary50'}
        />
      )}
    </VStack>
  )
}

const Content = ({
  children,
  ...props
}: Omit<CardProps, 'gradient' | 'animated'>) => (
  <VStack
    p='$2'
    {...props}
  >
    {children}
  </VStack>
)

export default Card
