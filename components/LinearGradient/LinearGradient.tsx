import { LinearGradient as GSLinearGradient } from '@gluestack-ui/themed'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { type ComponentProps } from 'react'

type Coordinates = {
  x: number
  y: number
}

type LinearGradientProps = Omit<
  ComponentProps<typeof GSLinearGradient>,
  'end' | 'start'
> & {
  colors: string[]

  end?: number | Coordinates
  start?: number | Coordinates
}

const LinearGradient = ({
  colors,
  end = 1,
  start = 0,
  ...props
}: LinearGradientProps) => (
  <GSLinearGradient
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

export default LinearGradient
