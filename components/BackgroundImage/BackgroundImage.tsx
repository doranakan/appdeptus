import { Image } from 'expo-image'

type BackgroundImageProps = {
  opacity?: number
  source: string
}

const BackgroundImage = ({ opacity, source }: BackgroundImageProps) => (
  <Image
    source={source}
    style={{
      height: '100%',
      opacity,
      width: '100%'
    }}
  />
)

export default BackgroundImage
