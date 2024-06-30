import { Heading, LinearGradient } from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import { config, useColorMode } from 'appdeptus/designSystem'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { AnimatePresence, motify } from 'moti'
import { type PropsWithChildren } from 'react'

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
            fontFamily='$mono'
            size='4xl'
            position='absolute'
            textTransform='capitalize'
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
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        as={ExpoLinearGradient}
        style={{
          width: '100%'
        }}
      />
    </MaskedView>
  )
}

export default GradientHeading
