import { skipToken } from '@reduxjs/toolkit/query'
import { useUnmount } from 'ahooks'
import {
  Error,
  Loading,
  resetTheme,
  ScreenContainer
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useAppDispatch } from 'appdeptus/store'
import { useLocalSearchParams } from 'expo-router'
import { useGetGameQuery } from '../../api'
import ActiveView from './ActiveView'
import EndedView from './EndedView'

const GameScreen = () => {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  const {
    data: game,
    isError,
    isLoading
  } = useGetGameQuery(Number(gameId) ?? skipToken)
  const { data: user } = useGetUserProfileQuery()

  const dispatch = useAppDispatch()

  useUnmount(() => dispatch(resetTheme()))

  if (!game || !user) {
    return (
      <ScreenContainer className='items-center justify-center'>
        {isLoading ? <Loading /> : null}
        {isError ? <Error /> : null}
      </ScreenContainer>
    )
  }

  if (game.status === 'ended') {
    return <EndedView game={game} />
  }

  return (
    <ActiveView
      game={game}
      user={user}
    />
  )
}

export default GameScreen