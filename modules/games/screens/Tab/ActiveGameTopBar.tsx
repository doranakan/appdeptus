import {
  HStack,
  Pressable,
  Scoreboard,
  Text,
  themeColors,
  VersusBackground,
  VStack
} from 'appdeptus/components'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetGameQuery } from '../../api'

const ActiveGameTopBar = () => {
  const { data } = useGetGameQuery()

  if (!data) {
    return null
  }

  return (
    <Link
      asChild
      href={`games/${data.id}`}
    >
      <Pressable>
        <VStack
          className='bg-primary-950'
          style={styles.container}
        >
          <VersusBackground
            codexOne={data.playerOne.army.codex.name}
            codexTwo={data.playerTwo.army.codex.name}
          />
          <SafeAreaView edges={['top']}>
            <VStack className='p-4'>
              <Scoreboard
                playerOne={data.playerOne}
                playerTwo={data.playerTwo}
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
