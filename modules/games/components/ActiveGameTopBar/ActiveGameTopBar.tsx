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
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useFocusEffect } from 'expo-router'
import { memo, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetGameQuery } from '../../api'

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

  if (!game) {
    return null
  }

  return (
    <Link
      asChild
      href={`games/${game.id}`}
    >
      <Pressable>
        <VStack
          className='bg-primary-950 shadow-sm'
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
                className='text-success-300'
                size='2xl'
              >
                •
              </Text>
              <Text family='body-bold'>Locked in Battle</Text>
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
