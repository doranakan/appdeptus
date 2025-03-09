import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community, type UserProfile } from 'appdeptus/models'
import { type EndedGame } from 'appdeptus/models/game'
import { getEndedGameListSchema } from 'appdeptus/modules/games/api/schemas'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { merge } from 'lodash'
import { type CommunitiesApiTags } from '../tags'

type LeaderboardEntry = {
  user: UserProfile
  w: number
  l: number
  t: number
}

type CommunityGames = {
  games: EndedGame[]
  leaderboard: LeaderboardEntry[]
}

const getCommunityGameList = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.query<CommunityGames, Community>({
    queryFn: async ({ id, members }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .select(
            `
            *,
            player_one (
              *
            ),
            army_one (
              *,
              codex!inner(
                *
              )
            ),
            player_two (
              *
            ),
            army_two (
              *,
              codex!inner(
                *
              )
            )
            `
          )
          .eq('community', id)
          .eq('status', 'ended')

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const games = getEndedGameListSchema.parse(mapNullToUndefined(data))

        const leaderboardMembers = members.reduce<
          Record<string, LeaderboardEntry>
        >((acc, curr) => {
          acc[curr.id] = {
            user: curr,
            w: 0,
            l: 0,
            t: 0
          }
          return acc
        }, {})

        const entries = games.reduce<Record<string, LeaderboardEntry>>(
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

        const completeLeaderboard = merge(leaderboardMembers, entries)

        const leaderboard = Object.values(completeLeaderboard).sort((a, b) => {
          if (b.w !== a.w) return b.w - a.w

          if (a.l !== b.l) return a.l - b.l

          return b.t - a.t
        })

        return {
          data: {
            games,
            leaderboard
          }
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getCommunityGameList
