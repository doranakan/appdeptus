import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { isEndedGame, isNewGame } from 'appdeptus/models/game'
import { useLocalSearchParams } from 'expo-router'
import { useGetGameQuery } from '../../api'
import Game from './Game'

const PlayGameScreen = () => {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  const { game } = useGetGameQuery(gameId ?? skipToken, {
    selectFromResult: ({ data }) => {
      if (!data || isEndedGame(data) || isNewGame(data)) {
        return { game: undefined }
      }

      return { game: data }
    }
  })

  if (!game) {
    return <Loading />
  }

  return <Game game={game} />
}

export default PlayGameScreen
