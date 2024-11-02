import Text from '../Text'

type ScreenTitleProps = {
  children: string
}

const ScreenTitle = ({ children }: ScreenTitleProps) => (
  <Text
    family='heading-regular'
    size='4xl'
  >
    {children}
  </Text>
)

export default ScreenTitle
