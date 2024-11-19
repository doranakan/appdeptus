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
import { useAppDispatch } from 'appdeptus/store'
import { QrCode } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { useCreateGameMutation } from '../../api'
import { Background, GamePreview } from '../../components'
import QRCodeBottomSheet from './QRCodeBottomSheet'
import ref from './ref'

const NewGameScreen = () => {
  const { data } = useGetArmyListQuery()

  const [selectedArmy, setSelectedArmy] = useState<Army>()

  const dispatch = useAppDispatch()

  const [createGame, { isLoading }] = useCreateGameMutation()

  const [newGameId, setNewGameId] = useState<number>(0)

  useUnmount(() => dispatch(resetTheme()))

  return (
    <VStack className='flex-1 bg-primary-950'>
      {selectedArmy ? <Background codexOne={selectedArmy.codex.name} /> : null}
      <ScreenContainer
        className='bg-transparent p-4'
        safeAreaInsets={['top', 'bottom']}
        space='md'
      >
        <NavigationHeader
          variant='backButton'
          rightButton={{
            disabled: !selectedArmy,
            loading: isLoading,
            onPress: async () => {
              if (selectedArmy) {
                const res = await createGame(selectedArmy.id)

                if ('error' in res) {
                  return
                }

                setNewGameId(res.data)
                ref.current?.present()
              }
            },
            variant: 'callback',
            icon: QrCode
          }}
        />

        {selectedArmy ? (
          <GamePreview armyOne={selectedArmy} />
        ) : (
          <VStack
            className='py-4'
            space='md'
          >
            <ScreenTitle>new game</ScreenTitle>
            <ScreenSubtitle>choose your warhost</ScreenSubtitle>
            <Text family='body-regular-italic'>
              Assemble your forces, warrior of the Imperium. When your army
              stands ready, tap the QR Seal of the Omnissiah in the top right.
              This sacred glyph shall encode your war protocols. Let your
              opponent scan it, and the rites of battle shall commence.
            </Text>
          </VStack>
        )}

        <FlatList
          className='container'
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
                detachment={item.detachment.name}
                name={item.name}
                points={item.points}
              />
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
        <QRCodeBottomSheet gameId={newGameId} />
      </ScreenContainer>
    </VStack>
  )
}

export default NewGameScreen
