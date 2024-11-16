import { useUnmount } from 'ahooks'
import {
  ArmyListItem,
  NavigationHeader,
  Pressable,
  resetTheme,
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  setTheme,
  Text,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { QrCode } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useCreateGameMutation } from '../../api'
import { ArmySelectionTopContainer } from '../../components'
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
        <ArmySelectionTopContainer
          armyOne={selectedArmy}
          player='one'
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
        {!selectedArmy ? (
          <Text family='body-regular-italic'>
            Assemble your forces, warrior of the Imperium. When your army stands
            ready, tap the QR Seal of the Omnissiah in the top right. This
            sacred glyph shall encode your war protocols. Let your opponent scan
            it, and the rites of battle shall commence.
          </Text>
        ) : null}
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
                  !selectedArmy
                    ? 'selectable'
                    : item.id === selectedArmy.id
                      ? 'selected'
                      : 'selectable-alt'
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

export default NewGameScreen
