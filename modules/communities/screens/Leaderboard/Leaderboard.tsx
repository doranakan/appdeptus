import {
  HStack,
  NavigationHeader,
  PlayerTag,
  Pressable,
  ScreenContainer,
  ScreenTitle,
  TableList,
  Text,
  VStack
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Link, useLocalSearchParams } from 'expo-router'
import React, { type ComponentProps } from 'react'
import { useGetCommunityQuery } from '../../api'

const LeaderboardScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data: user } = useGetUserProfileQuery()

  const { data: community } = useGetCommunityQuery(id)

  return (
    <ScreenContainer
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <VStack
        className='px-4'
        space='md'
      >
        <NavigationHeader
          variant='backButton'
          title={community?.name}
        />
        <ScreenTitle>Leaderboard</ScreenTitle>
      </VStack>
      <TableList
        data={community?.members}
        renderItem={({ item, index }) => (
          <>
            <HStack
              className='flex-1 items-center px-4'
              space='sm'
            >
              <Text family='body-bold'>{index + 1}</Text>
              <Link
                asChild
                href={`user/${item.id}`}
              >
                <Pressable disabled={item.id === user?.id}>
                  <PlayerTag
                    player={item}
                    showHash
                  />
                </Pressable>
              </Link>
            </HStack>
            <ScoreCard
              l={item.losses}
              t={item.ties}
              w={item.wins}
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
        keyExtractor={({ id }) => id}
      />
    </ScreenContainer>
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
