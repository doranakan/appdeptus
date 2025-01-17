import { type SelectableUnit } from 'appdeptus/models'
import { Crown } from 'lucide-react-native'
import { memo } from 'react'
import IconBadge from '../IconBadge'
import Text from '../Text'
import { HStack } from '../ui'
import { unitTypeToIcon } from '../utils'

type UnitNameProps = Pick<SelectableUnit, 'name' | 'type'> & {
  warlord?: boolean
}

const UnitName = ({ name, type, warlord }: UnitNameProps) => (
  <HStack
    className='flex-1 items-center'
    space='md'
  >
    <IconBadge Icon={warlord ? Crown : unitTypeToIcon[type]} />
    <Text
      className='flex-1'
      family='body-bold'
      adjustsFontSizeToFit
      numberOfLines={2}
      size='lg'
    >
      {name}
    </Text>
  </HStack>
)

export default memo(UnitName)
