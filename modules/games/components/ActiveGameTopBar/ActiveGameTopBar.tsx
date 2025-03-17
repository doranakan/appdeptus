import {
  HStack,
  Pressable,
  Scoreboard,
  Text,
  themeColors,
  VersusBackground,
  VStack
} from 'appdeptus/components'
import { type ActiveGame } from 'appdeptus/models/game'
import clsx from 'clsx'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useFocusEffect } from 'expo-router'
import { memo, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGameUpdates, useGetGameQuery } from '../../api'

const ActiveGameTopBar = () => {
  const { data: game, refetch } = useGetGameQuery()

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch])
  )

  if (!game || game.status === 'ended') {
    return null
  }

  return <ActiveGameTopBarContent gameId={game.id} />
}

type ActiveGameTopBarContentProps = {
  gameId: ActiveGame['id']
}

const ActiveGameTopBarContent = ({ gameId }: ActiveGameTopBarContentProps) => {
  const { data: game } = useGetGameQuery(gameId)

  useGameUpdates(gameId)

  if (!game) {
    return null
  }

  return (
    <Link
      asChild
      href={`game/${game.id}${game.status === 'in_lobby' ? '/lobby' : ''}`}
    >
      <Pressable>
        <VStack
          className='bg-primary-950 shadow-md'
          style={styles.container}
        >
          <VersusBackground
            codexOne={game.playerOne.army.codex.name}
            codexTwo={game.playerTwo.army.codex.name}
          />
          <SafeAreaView edges={['top']}>
            <VStack className='p-4'>
              <Scoreboard
                playerOne={game.playerOne}
                playerTwo={game.playerTwo}
                status={game.status}
              />
            </VStack>
            <HStack
              className='items-center justify-center'
              space='xs'
            >
              <LinearGradient
                colors={[
                  `${themeColors.default.primary[950]}00`,
                  themeColors.default.primary[950]
                ]}
                style={styles.gradient}
              />
              <Text
                className={clsx(
                  game.status === 'in_lobby'
                    ? 'text-warning-700'
                    : 'text-success-300'
                )}
                size='2xl'
              >
                •
              </Text>
              <Text family='body-bold'>
                {game.status === 'in_lobby' ? 'Deploying' : 'Locked in Battle'}
              </Text>
            </HStack>
          </SafeAreaView>
        </VStack>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: `${themeColors.default.primary[50]}20`
  },
  gradient: {
    height: '100%',
    position: 'absolute',
    width: '100%'
  }
})

export default memo(ActiveGameTopBar)
