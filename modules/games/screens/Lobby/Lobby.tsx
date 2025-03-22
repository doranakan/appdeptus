import { useMount } from 'ahooks'
import {
  Card,
  Error,
  HStack,
  Loading,
  NavigationHeader,
  ScreenContainer,
  selectThemeName,
  setTheme,
  Text,
  themeColors,
  VersusBackground,
  VStack
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useAppDispatch } from 'appdeptus/store'
import { router, useGlobalSearchParams } from 'expo-router'
import { Check, Clock10 } from 'lucide-react-native'
import { useEffect } from 'react'
import { Switch } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import {
  useGameUpdates,
  useGetGameQuery,
  useSetFirstPlayerMutation,
  useSetReadyPlayerMutation
} from '../../api'
import DataTable from './DataTable'
import RankedSelector from './RankedSelector'
import Roster from './Roster'

const LobbyScreen = () => {
  const { gameId } = useGlobalSearchParams<{ gameId: string }>()

  const {
    data: game,
    isError,
    isLoading,
    refetch
  } = useGetGameQuery(Number(gameId))

  useGameUpdates(Number(gameId))

  const { data: user } = useGetUserProfileQuery()

  const [setFirstPlayer] = useSetFirstPlayerMutation()
  const [setReadyPlayer, { isLoading: isSettingReady }] =
    useSetReadyPlayerMutation()

  useEffect(() => {
    if (game?.status === 'active') {
      router.replace(`game/${gameId}`)
    }
  })

  const themeName = useSelector(selectThemeName)
  const dispatch = useAppDispatch()

  useMount(() => {
    if (themeName === 'default') {
      dispatch(setTheme(player.army.codex.name))
    }
  })

  if (isError) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['top', 'bottom']}
        space='md'
      >
        <NavigationHeader variant='backButton' />
        <Error
          button={{
            onPress: refetch,
            variant: 'callback',
            text: 'Retry'
          }}
          description='There was an error with your request.'
        />
      </ScreenContainer>
    )
  }

  if (!game || !user || isLoading) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['top', 'bottom']}
        space='md'
      >
        <NavigationHeader variant='backButton' />
        <Loading />
      </ScreenContainer>
    )
  }

  const player =
    game.playerOne.profile.id === user.id ? game.playerOne : game.playerTwo

  return (
    <ScreenContainer safeAreaInsets={['top', 'bottom']}>
      <VStack className='absolute h-full w-full'>
        <VersusBackground
          codexOne={game.playerOne.army.codex.name}
          codexTwo={game.playerTwo.army.codex.name}
          bottomGradient
        />
      </VStack>
      <VStack
        className='flex-1 px-4'
        space='md'
      >
        <NavigationHeader
          variant='backButton'
          rightButton={{
            onPress: async () =>
              await setReadyPlayer({
                gameId: Number(gameId),
                player: game.playerOne.profile.id === user.id ? 'one' : 'two',
                ready: !player.isReady
              }),
            variant: 'callback',
            icon: player.isReady ? Clock10 : Check,
            loading: isSettingReady,
            disabled: isSettingReady
          }}
          title={player.isReady ? 'waiting for opponent' : 'setup game'}
        />

        <DataTable
          playerOne={game.playerOne}
          playerTwo={game.playerTwo}
        />

        <Card>
          <VStack
            className='p-4'
            space='md'
          >
            <Text
              className='uppercase'
              family='body-bold'
            >
              Settings
            </Text>
            <HStack className='items-center justify-between'>
              <VStack>
                <Text family='body-bold'>Start first:</Text>
                <Text size='sm'>{`You will start ${player.isActive ? 'First' : 'Second'}`}</Text>
              </VStack>
              <Switch
                trackColor={{
                  false: themeColors.default.primary[300],
                  true: themeColors.default.tertiary[500]
                }}
                thumbColor={themeColors.default.tertiary[50]}
                ios_backgroundColor={themeColors.default.primary[300]}
                onChange={async (val) => {
                  await setFirstPlayer({
                    gameId: Number(gameId),
                    firstPlayer:
                      user.id === game.playerOne.profile.id
                        ? val.nativeEvent.value
                          ? 'one'
                          : 'two'
                        : val.nativeEvent.value
                          ? 'two'
                          : 'one'
                  })
                }}
                value={player.isActive}
              />
            </HStack>
            <RankedSelector game={game} />
          </VStack>
        </Card>

        <Roster game={game} />
      </VStack>
    </ScreenContainer>
  )
}

export default LobbyScreen
