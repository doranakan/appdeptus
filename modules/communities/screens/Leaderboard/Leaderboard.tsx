import { skipToken } from '@reduxjs/toolkit/query'
import {
  HStack,
  PlayerTag,
  Pressable,
  TableList,
  Text
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Link, useLocalSearchParams } from 'expo-router'
import React, { type ComponentProps } from 'react'
import { useGetCommunityGameListQuery, useGetCommunityQuery } from '../../api'
import { CommunityScreenContainer } from '../../components'

const LeaderboardScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data: user } = useGetUserProfileQuery()

  const { data: community } = useGetCommunityQuery(id)

  const { data, isFetching } = useGetCommunityGameListQuery(
    community ?? skipToken
  )

  return (
    <CommunityScreenContainer
      title='Leaderboard'
      isLoading={isFetching}
    >
      <TableList
        data={data?.leaderboard}
        renderItem={({ item, index }) => (
          <>
            <HStack
              className='items-center px-2'
              space='sm'
            >
              <Text family='body-bold'>{index + 1}</Text>
              <Link
                asChild
                href={`user/${item.user.id}`}
              >
                <Pressable disabled={item.user.id === user?.id}>
                  <PlayerTag player={item.user} />
                </Pressable>
              </Link>
            </HStack>
            <ScoreCard
              l={item.l}
              t={item.t}
              w={item.w}
              size='lg'
            />
          </>
        )}
        ListHeaderComponent={
          <HStack className='justify-end py-4'>
            <ScoreCard
              l='l'
              t='t'
              w='w'
              size='sm'
            />
          </HStack>
        }
        keyExtractor={({ user }) => user.id}
      />
    </CommunityScreenContainer>
  )
}

type ScoreCardProps = {
  w: string | number
  l: string | number
  t: string | number
  size: ComponentProps<typeof Text>['size']
}

const ScoreCard = ({ l, t, w, size }: ScoreCardProps) => (
  <HStack className='w-32 justify-between'>
    <Text
      className='flex-1 text-center uppercase'
      family='body-bold'
      size={size}
    >
      {w}
    </Text>
    <Text
      className='flex-1 text-center uppercase'
      family='body-bold'
      size={size}
    >
      {l}
    </Text>
    <Text
      className='flex-1 text-center uppercase'
      family='body-bold'
      size={size}
    >
      {t}
    </Text>
  </HStack>
)

export default LeaderboardScreen
