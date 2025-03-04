import { Avatar, Card, HStack, Pressable, Text } from 'appdeptus/components'
import { type Community } from 'appdeptus/models'
import { Link } from 'expo-router'
import { snakeCase } from 'lodash'
import { memo } from 'react'

type CommunityListItemProps = {
  community: Omit<Community, 'members'>

  isMember?: boolean
  notifications?: number
}

const CommunityListItem = ({
  community,
  isMember,
  notifications
}: CommunityListItemProps) => (
  <Link
    asChild
    href={`communities/${community.id}`}
  >
    <Pressable>
      <Card variant={isMember ? 'default' : 'selectable'}>
        <HStack
          className='flex-1 items-center p-4'
          space='md'
        >
          <Avatar
            {...community}
            size='sm'
          />
          <Text
            className='flex-1 text-ellipsis'
            numberOfLines={1}
            family='body-bold'
            size='lg'
          >
            {snakeCase(community.name)}
          </Text>
          {notifications ? (
            <HStack className='h-8 w-8 items-center justify-center rounded-full bg-tertiary-600'>
              <Text family='body-bold'>{notifications}</Text>
            </HStack>
          ) : null}
        </HStack>
      </Card>
    </Pressable>
  </Link>
)

export default memo(CommunityListItem)
