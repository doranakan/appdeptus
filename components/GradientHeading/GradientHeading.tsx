import { Heading } from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import { config, useColorMode } from 'appdeptus/designSystem'

import { AnimatePresence, motify } from 'moti'
import { type PropsWithChildren } from 'react'
import LinearGradient from '../LinearGradient'

const AnimatedHeading = motify(Heading)()

const GradientHeading = ({ children }: PropsWithChildren) => {
  const colorMode = useColorMode()
  return (
    <MaskedView
      style={{ flexDirection: 'row', width: '100%', height: 65 }}
      maskElement={
        <AnimatePresence>
          <AnimatedHeading
            from={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            key={children as string}
            transition={{
              duration: 100,
              type: 'timing'
            }}
            exitTransition={{
              duration: 100,
              type: 'timing'
            }}
            alignSelf='center'
            size='4xl'
            position='absolute'
          >
            {children}
          </AnimatedHeading>
        </AnimatePresence>
      }
    >
      <LinearGradient
        colors={[
          colorMode === 'light'
            ? config.tokens.colors.primary500
            : config.themes[colorMode].colors.primary500,
          colorMode === 'light'
            ? config.tokens.colors.secondary500
            : config.themes[colorMode].colors.secondary500
        ]}
      />
    </MaskedView>
  )
}

export default GradientHeading
