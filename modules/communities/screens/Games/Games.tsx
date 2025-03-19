import { resetTheme, selectThemeName, Text } from 'appdeptus/components'
import { useAppDispatch } from 'appdeptus/store'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { CommunityScreenContainer } from '../../components'
import GameList from './GameList'

const GamesScreen = () => {
  const themeName = useSelector(selectThemeName)

  const dispatch = useAppDispatch()

  useFocusEffect(
    useCallback(() => {
      if (themeName !== 'default') {
        dispatch(resetTheme())
      }
    }, [dispatch, themeName])
  )

  return (
    <CommunityScreenContainer title='Games'>
      <Text
        family='body-regular-italic'
        size='sm'
      >
        Here are listed all the past games playeb by the community member
        against each others.
      </Text>
      <GameList />
    </CommunityScreenContainer>
  )
}

export default GamesScreen
