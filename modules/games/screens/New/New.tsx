import { useUnmount } from 'ahooks'
import {
  ArmyListItem,
  Badge,
  GameDataTable,
  HStack,
  NavigationHeader,
  Pressable,
  resetTheme,
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  setTheme,
  Text,
  themeColors,
  VersusBackground,
  VStack
} from 'appdeptus/components'
import { shortCodexNames } from 'appdeptus/constants'
import { type Army } from 'appdeptus/models'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { LinearGradient } from 'expo-linear-gradient'
import { QrCode } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useCreateGameMutation } from '../../api'
import QRCodeBottomSheet from './QRCodeBottomSheet'
import ref from './ref'

const NewGameScreen = () => {
  const { data } = useGetArmyListQuery()

  const [selectedArmy, setSelectedArmy] = useState<Army>()

  const dispatch = useDispatch()

  const [createGame, { isLoading }] = useCreateGameMutation()

  const [newGameId, setNewGame] = useState<number>(0)

  useUnmount(() => dispatch(resetTheme()))

  return (
    <ScreenContainer
      safeAreaInsets={['bottom']}
      space='md'
    >
      {selectedArmy ? (
        <VStack className='flex-1'>
          <VersusBackground codexOne={selectedArmy.codex.name} />
          <LinearGradient
            colors={[
              `${themeColors[selectedArmy.codex.name].primary[950]}00`,
              themeColors[selectedArmy.codex.name].primary[950]
            ]}
            style={styles.gradient}
          />
          <SafeAreaView
            edges={['top']}
            style={styles.safeAreaView}
          >
            <VStack className='flex-1 justify-between px-4'>
              <NavigationHeader
                variant='backButton'
                rightButton={{
                  onPress: async () => {
                    const res = await createGame(selectedArmy.id)

                    if ('error' in res) {
                      return
                    }

                    setNewGame(res.data)

                    ref.current?.present()
                  },
                  icon: QrCode,
                  loading: isLoading,
                  variant: 'callback'
                }}
              />
              <VStack space='md'>
                <Text
                  className='uppercase'
                  family='body-bold'
                  size='4xl'
                >
                  {shortCodexNames[selectedArmy.codex.name]}
                </Text>
                <HStack className='justify-between'>
                  <Badge
                    text={selectedArmy.composition.detachment.name}
                    codex={selectedArmy.codex.name}
                  />
                </HStack>
                <GameDataTable
                  data={[
                    {
                      title: 'Warlord',
                      valueL:
                        selectedArmy.composition.warlord.type === 'team'
                          ? selectedArmy.composition.warlord.leader.name
                          : selectedArmy.composition.warlord.name,
                      valueR: ''
                    },
                    {
                      title: 'Points',
                      valueL: `${selectedArmy.points}PTS`,
                      valueR: ''
                    }
                  ]}
                />
              </VStack>
            </VStack>
          </SafeAreaView>
        </VStack>
      ) : (
        <SafeAreaView edges={['top']}>
          <VStack
            className='px-4'
            space='md'
          >
            <NavigationHeader
              variant='backButton'
              rightButton={{
                disabled: true,
                onPress: () => {},
                variant: 'callback',
                icon: QrCode
              }}
            />
            <ScreenTitle>new game</ScreenTitle>
          </VStack>
        </SafeAreaView>
      )}

      <VStack
        className='flex-1 px-4'
        space='md'
      >
        <ScreenSubtitle>choose your warhost</ScreenSubtitle>
        <Text family='body-regular-italic'>
          Assemble your forces, warrior of the Imperium. When your army stands
          ready, tap the QR Seal of the Omnissiah in the top right. This sacred
          glyph shall encode your war protocols. Let your opponent scan it, and
          the rites of battle shall commence.
        </Text>
        <FlatList
          className='container flex-1'
          data={data}
          keyExtractor={({ id }) => String(id)}
          ItemSeparatorComponent={() => <VStack className='h-4' />}
          ListFooterComponent={() => <VStack className='h-4' />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedArmy(item)
                dispatch(setTheme(item.codex.name))
              }}
            >
              <ArmyListItem
                variant={
                  item.id === selectedArmy?.id ? 'selected' : 'selectable'
                }
                codex={item.codex.name}
                detachment={item.composition.detachment.name}
                name={item.name}
                points={item.points}
              />
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <QRCodeBottomSheet gameId={newGameId} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  gradient: {
    bottom: 0,
    height: '25%',
    position: 'absolute',
    width: '100%'
  },
  safeAreaView: {
    flex: 1
  }
})

export default NewGameScreen
