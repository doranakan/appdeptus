import { Heading, LinearGradient } from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import { config, type ColorMode } from 'appdeptus/designSystem'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { AnimatePresence, motify } from 'moti'
import { type PropsWithChildren } from 'react'

type GradientHeadingProps = {
  colorMode: ColorMode
}

const AnimatedHeading = motify(Heading)()

const GradientHeading = ({
  colorMode,
  children
}: PropsWithChildren<GradientHeadingProps>) => (
  <MaskedView
    style={{ flexDirection: 'row', width: '100%', height: 55 }}
    maskElement={
      <AnimatePresence exitBeforeEnter>
        <AnimatedHeading
          alignSelf='center'
          from={{
            opacity: 0,
            scale: 1.05
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.95
          }}
          key={children as string}
          size='4xl'
          transition={{
            duration: 100,
            type: 'timing'
          }}
          exitTransition={{
            duration: 200
          }}
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

export default GradientHeading
