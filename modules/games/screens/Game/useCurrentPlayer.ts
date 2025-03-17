import { type ActiveGame } from 'appdeptus/models/game'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'

const useCurrentPlayer = (game: ActiveGame) => {
  const { data: user } = useGetUserProfileQuery()

  return game.playerOne.profile.id === user?.id
    ? game.playerOne
    : game.playerTwo
}

export default useCurrentPlayer
