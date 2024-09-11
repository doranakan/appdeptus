import { LinearGradient } from 'expo-linear-gradient'

type Coordinates = {
  x: number
  y: number
}

type CustomLinearGradientProps = {
  colors: string[]

  end?: Coordinates
  start?: Coordinates
}

const CustomLinearGradient = ({
  colors,
  ...props
}: CustomLinearGradientProps) => (
  <LinearGradient
    colors={colors}
    {...props}
    className='h-full w-full'
  />
)

export default CustomLinearGradient
