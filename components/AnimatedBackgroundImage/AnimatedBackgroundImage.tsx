import { VStack } from 'appdeptus/components/ui/vstack'
import { Image } from 'expo-image'
import { AnimatePresence, motify } from 'moti'

type AnimatedBackgroundImageProps = {
  delay?: number
  duration?: number
  exitScale?: number
  fromScale?: number
  opacity?: number
  source: string
}

const AnimatedImage = motify(Image)()

const AnimatedBackgroundImage = ({
  delay = 0,
  duration = 150,
  exitScale = 0.9,
  fromScale = 1.1,
  opacity = 1,
  source
}: AnimatedBackgroundImageProps) => (
  <VStack className='h-full w-full'>
    <AnimatePresence>
      <AnimatedImage
        from={{
          opacity: 0,
          scale: fromScale
        }}
        animate={{
          opacity,
          scale: 1
        }}
        exit={{
          opacity: 0,
          scale: exitScale
        }}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%'
        }}
        exitTransition={{
          duration,
          type: 'timing'
        }}
        transition={{
          delay,
          duration,
          type: 'timing'
        }}
        key={source}
        source={source}
      />
    </AnimatePresence>
  </VStack>
)

export default AnimatedBackgroundImage
