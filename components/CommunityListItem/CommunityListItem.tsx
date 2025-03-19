import { type Community } from 'appdeptus/models'
import { snakeCase } from 'lodash'
import { memo } from 'react'
import Avatar from '../Avatar'
import Card from '../Card'
import Text from '../Text'
import { HStack } from '../ui'

type CommunityListItemProps = {
  community: Omit<Community, 'members'>

  notificationCount?: number
  selected?: boolean
}

const CommunityListItem = ({
  community,
  notificationCount,
  selected
}: CommunityListItemProps) => (
  <Card variant={selected ? 'selected' : 'default'}>
    <HStack
      className='items-center p-4'
      space='md'
    >
      <Avatar {...community} />
      <Text
        className='flex-1 text-ellipsis'
        numberOfLines={1}
        family='body-bold'
        size='lg'
      >
        {snakeCase(community.name)}
      </Text>
      {notificationCount ? (
        <HStack className='h-8 w-8 items-center justify-center rounded-full bg-tertiary-600'>
          <Text family='body-bold'>{notificationCount}</Text>
        </HStack>
      ) : null}
    </HStack>
  </Card>
)

export default memo(CommunityListItem)
