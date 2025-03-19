import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import {
  BottomSheet,
  CommunityListItem,
  HStack,
  IconBadge,
  Pressable,
  Text,
  themeColors,
  useToast,
  VStack
} from 'appdeptus/components'
import { type ActiveGame, type EndedGame } from 'appdeptus/models/game'
import { useGetCommonCommunitiesQuery } from 'appdeptus/modules/communities/api'
import { Medal } from 'lucide-react-native'
import React, { memo, useRef, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { useSetRankedGameMutation } from '../../api'

type RankedSelectorProps = {
  game: ActiveGame | EndedGame
}

const RankedSelector = ({ game }: RankedSelectorProps) => {
  const ref = useRef<BottomSheetModalMethods>(null)

  const { data: communities } = useGetCommonCommunitiesQuery({
    userOneId: game.playerOne.profile.id,
    userTwoId: game.playerTwo.profile.id
  })

  const [isRanked, setIsRanked] = useState(!!game.community)

  const [setRankedGame, { isLoading }] = useSetRankedGameMutation()

  const { show } = useToast()

  return (
    <>
      <HStack className='items-center justify-between'>
        <VStack>
          <Text family='body-bold'>Ranked:</Text>
          {game.community ? (
            <Pressable onPress={() => ref.current?.present()}>
              <Text size='sm'>
                Playing for{' '}
                <Text
                  family='body-bold'
                  size='sm'
                >
                  {game.community.name}
                </Text>
              </Text>
            </Pressable>
          ) : (
            <Text size='sm'>{"This game won't appear on any leaderboard"}</Text>
          )}
        </VStack>
        <Switch
          trackColor={{
            false: themeColors.default.primary[300],
            true: themeColors.default.tertiary[500]
          }}
          thumbColor={themeColors.default.tertiary[50]}
          ios_backgroundColor={themeColors.default.primary[300]}
          onChange={async (val) => {
            const { value: ranked } = val.nativeEvent

            if (!ranked) {
              const res = await setRankedGame({ gameId: game.id })

              if ('error' in res) {
                show({
                  title: '⚠️ error',
                  description: String(res.error)
                })
                return
              }

              setIsRanked(ranked)
              return
            }

            setIsRanked(ranked)
            return ref.current?.present()
          }}
          value={isRanked || !!game.community}
          disabled={!communities}
        />
      </HStack>
      <BottomSheet
        ref={ref}
        onPressBackdrop={() => {
          if (!game.community) {
            setIsRanked(false)
          }
          ref.current?.dismiss()
        }}
      >
        <VStack space='md'>
          <HStack
            className='items-center'
            space='md'
          >
            <IconBadge Icon={Medal} />
            <Text family='body-bold'>Ranked game</Text>
            {isLoading ? (
              <ActivityIndicator
                color={themeColors.default.primary[50]}
                size='small'
              />
            ) : null}
          </HStack>
          <Text>
            Select a community you have in common with your opponet to make this
            game final score count for that community leaderboard.
          </Text>
          {communities?.map((community) => (
            <Pressable
              key={community.id}
              onPress={async () => {
                const res = await setRankedGame({
                  gameId: game.id,
                  communityId: community.id
                })
                if ('error' in res) {
                  show({
                    title: '⚠️ error',
                    description: String(res.error)
                  })
                  return
                }

                ref.current?.dismiss()
              }}
            >
              <CommunityListItem
                community={community}
                selected={game.community?.id === community.id}
              />
            </Pressable>
          ))}
        </VStack>
      </BottomSheet>
    </>
  )
}

export default memo(RankedSelector)
