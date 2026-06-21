import { Link } from 'lucide-react-native'
import { type ReactElement } from 'react'
import { Icon, VStack } from '../ui'

type TeamUnitProps = {
  BodyGuard: ReactElement
  Leader?: ReactElement
  Support?: ReactElement
}

const TeamUnit = ({ BodyGuard, Leader, Support }: TeamUnitProps) => (
  <VStack space='sm'>
    {Leader}
    {Support}
    <Icon
      as={Link}
      className='px-4 color-primary-50'
      size='md'
    />
    {BodyGuard}
  </VStack>
)

export default TeamUnit
