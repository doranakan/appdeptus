import { LinearGradient as GSLinearGradient } from '@gluestack-ui/themed'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { type ComponentProps } from 'react'

type LinearGradientProps = {
  colors: string[]
} & ComponentProps<typeof GSLinearGradient>

const LinearGradient = ({
  colors,
  end = 1,
  start = 0,
  ...props
}: LinearGradientProps) => (
  <GSLinearGradient
    as={ExpoLinearGradient}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    colors={colors}
    end={end}
    height='$full'
    start={start}
    width='$full'
    {...props}
  />
)

export default LinearGradient
