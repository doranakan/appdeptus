import { skipToken } from '@reduxjs/toolkit/query'
import { Avatar, Card, HStack, Pressable, Text } from 'appdeptus/components'
import { type Community } from 'appdeptus/models'
import { Link } from 'expo-router'
import { snakeCase } from 'lodash'
import { memo } from 'react'
import {
  useGetCommunityQuery,
  useGetCommunityRequestListQuery
} from '../../api'
import useIsInquisitor from '../../hooks'

type CommunityListItemProps = {
  community: Omit<Community, 'members'>

  isMember?: boolean
}

const CommunityListItem = ({ community, isMember }: CommunityListItemProps) => {
  const { data } = useGetCommunityQuery(isMember ? community.id : skipToken)

  const isInquisitor = useIsInquisitor(data?.members ?? [])

  const { data: requests } = useGetCommunityRequestListQuery(
    isInquisitor ? community.id : skipToken
  )

  return (
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
            <Text
              className='flex-1 text-ellipsis'
              numberOfLines={1}
              family='body-bold'
              size='lg'
            >
              {snakeCase(community.name)}
            </Text>
            {requests?.length ? (
              <HStack className='h-8 w-8 items-center justify-center rounded-full bg-tertiary-600'>
                <Text family='body-bold'>{requests?.length}</Text>
              </HStack>
            ) : null}
          </HStack>
        </Card>
      </Pressable>
    </Link>
  )
}

export default memo(CommunityListItem)
