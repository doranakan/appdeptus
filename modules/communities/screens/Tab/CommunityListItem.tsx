import {
  Avatar,
  Badge,
  Card,
  HStack,
  Pressable,
  Text,
  VStack
} from 'appdeptus/components'
import { type Community } from 'appdeptus/models'
import { Link } from 'expo-router'
import { snakeCase } from 'lodash'
import { memo } from 'react'

type CommunityListItemProps = {
  community: Community
}

const CommunityListItem = ({ community }: CommunityListItemProps) => (
  <Link
    asChild
    href={`communities/${community.id}`}
  >
    <Pressable>
      <Card>
        <HStack
          className='items-center p-4'
          space='md'
        >
          <Avatar {...community} />
          <VStack space='xs'>
            <Text
              family='body-bold'
              size='xl'
            >
              {snakeCase(community.name)}
            </Text>
            <Badge text={`${community.members.length} Members`} />
          </VStack>
        </HStack>
      </Card>
    </Pressable>
  </Link>
)

export default memo(CommunityListItem)
