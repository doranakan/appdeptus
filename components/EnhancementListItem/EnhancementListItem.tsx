import { type Enhancement } from 'appdeptus/models'
import { CircleFadingPlus } from 'lucide-react-native'
import { type ComponentProps, memo } from 'react'
import Card from '../Card'
import IconBadge from '../IconBadge'
import Text from '../Text'
import { HStack } from '../ui'

type EnhancementListItemProps = {
  enhancement: Enhancement

  variant?: ComponentProps<typeof Card>['variant']
}

const EnhancementListItem = ({
  enhancement,
  variant
}: EnhancementListItemProps) => (
  <Card variant={variant}>
    <HStack
      className='items-center justify-between p-4'
      space='md'
    >
      <HStack
        className='flex-1 items-center'
        space='md'
      >
        <IconBadge Icon={CircleFadingPlus} />
        <Text
          className='line-clamp-1 flex-1'
          family='body-bold'
        >
          {enhancement.name}
        </Text>
      </HStack>
      <Text
        className='uppercase'
        family='body-bold'
        size='sm'
      >{`${enhancement.points}pts`}</Text>
    </HStack>
  </Card>
)

export default memo(EnhancementListItem)
