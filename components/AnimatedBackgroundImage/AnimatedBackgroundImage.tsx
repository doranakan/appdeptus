import { Image } from 'expo-image'
import { AnimatePresence, motify } from 'moti'

type AnimatedBackgroundImageProps = {
  opacity?: number
  source: string
}

const AnimatedImage = motify(Image)()

const AnimatedBackgroundImage = ({
  opacity = 1,
  source
}: AnimatedBackgroundImageProps) => (
  <AnimatePresence exitBeforeEnter>
    <AnimatedImage
      from={{
        opacity: 0
      }}
      animate={{
        opacity
      }}
      exit={{
        opacity: 0
      }}
      style={{
        height: '100%',
        width: '100%'
      }}
      exitTransition={{
        type: 'timing',
        duration: 250
      }}
      transition={{
        duration: 250
      }}
      key={source}
      source={source}
    />
  </AnimatePresence>
)

export default AnimatedBackgroundImage
