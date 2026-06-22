import Dots from '../Dots'
import Text from '../Text'
import { HStack } from '../ui'

type EnhancementRowProps = {
  name: string
  points: number
}

const EnhancementRow = ({ name, points }: EnhancementRowProps) => (
  <HStack space='sm'>
    <Text size='sm'>{name}</Text>
    <Dots />
    <Text
      className='uppercase'
      family='body-bold'
      size='sm'
    >{`${points}pts`}</Text>
  </HStack>
)

export default EnhancementRow
