import { resetTheme, selectThemeName, Text } from 'appdeptus/components'
import { useAppDispatch } from 'appdeptus/store'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { CommunityScreenContainer } from '../../components'
import ArmyList from './ArmyList'

const ArmiesScreen = () => {
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
    <CommunityScreenContainer title='Armies'>
      <Text
        family='body-regular-italic'
        size='sm'
      >
        If you cannot find an army owned by a community member, they may need to
        mark it as visible to communities in their army detail screen.
      </Text>
      <ArmyList />
    </CommunityScreenContainer>
  )
}

export default ArmiesScreen
