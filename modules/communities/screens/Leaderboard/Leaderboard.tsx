import {
  HStack,
  PlayerTag,
  Pressable,
  TableList,
  Text
} from 'appdeptus/components'
import { type UserProfile } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Link, useLocalSearchParams } from 'expo-router'
import { merge } from 'lodash'
import { type ComponentProps, useMemo } from 'react'
import { useGetCommunityGameListQuery, useGetCommunityQuery } from '../../api'
import { CommunityScreenContainer } from '../../components'

type LeaderboardEntry = {
  user: UserProfile
  w: number
  l: number
  t: number
}

const LeaderboardScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data: user } = useGetUserProfileQuery()

  const { data: community } = useGetCommunityQuery(id)

  const members = useMemo(() => {
    if (!community) {
      return {}
    }

    return community.members.reduce<Record<string, LeaderboardEntry>>(
      (acc, curr) => {
        acc[curr.id] = {
          user: curr,
          w: 0,
          l: 0,
          t: 0
        }
        return acc
      },
      {}
    )
  }, [community])

  const { data } = useGetCommunityGameListQuery(id)

  const leaderboard = useMemo(() => {
    if (!data) {
      return undefined
    }

    const entries = data.reduce<Record<string, LeaderboardEntry>>(
      (acc, game) => {
        const { playerOne, playerTwo } = game

        if (!acc[playerOne.profile.id]) {
          acc[playerOne.profile.id] = {
            user: playerOne.profile,
            w: 0,
            l: 0,
            t: 0
          }
        }
        if (!acc[playerTwo.profile.id]) {
          acc[playerTwo.profile.id] = {
            user: playerTwo.profile,
            w: 0,
            l: 0,
            t: 0
          }
        }

        const playerOneEntry = acc[playerOne.profile.id]
        const playerTwoEntry = acc[playerTwo.profile.id]

        if (playerOneEntry && playerTwoEntry) {
          if (playerOne.score > playerTwo.score) {
            playerOneEntry.w += 1
            playerTwoEntry.l += 1
          } else if (playerOne.score < playerTwo.score) {
            playerTwoEntry.w += 1
            playerOneEntry.l += 1
          } else {
            playerOneEntry.t += 1
            playerTwoEntry.t += 1
          }
        }

        return acc
      },
      {}
    )

    const completeLeaderboard = merge(entries, members)

    return Object.values(completeLeaderboard).sort((a, b) => {
      if (b.w !== a.w) return b.w - a.w

      if (a.l !== b.l) return a.l - b.l

      return b.t - a.t
    })
  }, [data, members])

  return (
    <CommunityScreenContainer title='Leaderboard'>
      <TableList
        data={leaderboard}
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
