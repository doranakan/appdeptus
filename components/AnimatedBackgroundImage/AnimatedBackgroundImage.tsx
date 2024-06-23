import { usePrevious, useToggle } from 'ahooks'
import { Image } from 'expo-image'
import { AnimatePresence, motify } from 'moti'
import { useLayoutEffect } from 'react'

type AnimatedBackgroundImageProps = {
  opacity?: number
  source: string
}

const AnimatedImage = motify(Image)()

const AnimatedBackgroundImage = ({
  opacity = 1,
  source
}: AnimatedBackgroundImageProps) => {
  const [left, { toggle }] = useToggle()

  useLayoutEffect(() => {
    toggle()
  }, [source, toggle])

  return (
    <AnimatePresence exitBeforeEnter>
      {left && (
        <BackgroundImage
          key='left'
          source={source}
          opacity={opacity}
        />
      )}
      {!left && (
        <BackgroundImage
          key='right'
          source={source}
          opacity={opacity}
        />
      )}
    </AnimatePresence>
  )
}

const BackgroundImage = ({ opacity, source }: AnimatedBackgroundImageProps) => {
  const previous = usePrevious(source)

  return (
    <AnimatedImage
      from={{
        opacity: 0
      }}
      animate={{
        opacity: [{ value: opacity, duration: 200 }]
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
        duration: 200
      }}
      source={previous ?? source}
    />
  )
}

export default AnimatedBackgroundImage
