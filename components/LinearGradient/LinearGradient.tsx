import { LinearGradient } from '@gluestack-ui/themed'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'

type Coordinates = {
  x: number
  y: number
}

type CustomLinearGradientProps = {
  colors: string[]

  end?: number | Coordinates
  start?: number | Coordinates
}

const CustomLinearGradient = ({
  colors,
  end = 1,
  start = 0,
  ...props
}: CustomLinearGradientProps) => (
  <LinearGradient
    as={ExpoLinearGradient}
    colors={colors}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    end={end}
    height='$full'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    start={start}
    width='$full'
    {...props}
  />
)

export default CustomLinearGradient
