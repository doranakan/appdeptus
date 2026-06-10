import { Button, Card, HStack, Text, VStack } from 'appdeptus/components'
import { X } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, ScrollView } from 'react-native'

type Player = {
  id: string
  name: string
}

type Pair = {
  p1Id: string
  p1Name: string
  p2Id: string
  p2Name: string
}

type TapToPairListProps = {
  players: Player[]
  initialPairs?: Pair[]
  isSaving?: boolean
  saveLabel?: string
  onSave: (pairs: [string, string][]) => void
}

const TapToPairList = ({
  players,
  initialPairs = [],
  isSaving,
  saveLabel = 'Save Pairings',
  onSave
}: TapToPairListProps) => {
  const [selected, setSelected] = useState<Player | null>(null)
  const [pairs, setPairs] = useState<Pair[]>(initialPairs)

  const pairedIds = new Set(pairs.flatMap((p) => [p.p1Id, p.p2Id]))
  const availablePlayers = players.filter((p) => !pairedIds.has(p.id))

  const handlePlayerPress = (player: Player) => {
    if (!selected) {
      setSelected(player)
      return
    }

    if (selected.id === player.id) {
      setSelected(null)
      return
    }

    setPairs((prev) => [
      ...prev,
      {
        p1Id: selected.id,
        p1Name: selected.name,
        p2Id: player.id,
        p2Name: player.name
      }
    ])
    setSelected(null)
  }

  const handleRemovePair = (index: number) => {
    setPairs((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack space='lg'>
        {pairs.length > 0 ? (
          <VStack space='sm'>
            <Text
              className='uppercase'
              family='body-bold'
            >
              Matches
            </Text>
            {pairs.map((pair, index) => (
              <Card key={index}>
                <HStack
                  className='items-center p-4'
                  space='sm'
                >
                  <Text
                    className='flex-1 text-center'
                    family='body-bold'
                  >
                    {pair.p1Name}
                  </Text>
                  <Text family='body-regular-italic'>vs</Text>
                  <Text
                    className='flex-1 text-center'
                    family='body-bold'
                  >
                    {pair.p2Name}
                  </Text>
                  <Pressable
                    hitSlop={8}
                    onPress={() => {
                      handleRemovePair(index)
                    }}
                  >
                    <X
                      className='text-primary-300'
                      size={16}
                    />
                  </Pressable>
                </HStack>
              </Card>
            ))}
          </VStack>
        ) : null}

        <VStack space='sm'>
          <Text
            className='uppercase'
            family='body-bold'
          >
            {selected
              ? `${selected.name} — select opponent`
              : 'Available Players'}
          </Text>

          {availablePlayers.length === 0 ? (
            <Text
              className='text-primary-300'
              family='body-regular-italic'
            >
              All players are paired
            </Text>
          ) : null}

          {availablePlayers.map((player) => {
            const isSelected = selected?.id === player.id
            return (
              <Pressable
                key={player.id}
                onPress={() => {
                  handlePlayerPress(player)
                }}
              >
                <Card>
                  <HStack
                    className={`items-center p-4 ${isSelected ? 'opacity-60' : ''}`}
                  >
                    <Text
                      className={isSelected ? 'text-primary-300' : ''}
                      family={isSelected ? 'body-bold' : 'body-regular'}
                    >
                      {player.name}
                    </Text>
                    {isSelected ? (
                      <Text
                        className='ml-auto text-primary-300'
                        family='body-regular-italic'
                      >
                        selected
                      </Text>
                    ) : null}
                  </HStack>
                </Card>
              </Pressable>
            )
          })}
        </VStack>

        <Button
          disabled={availablePlayers.length > 0}
          loading={isSaving}
          onPress={() => {
            onSave(pairs.map((p) => [p.p1Id, p.p2Id]))
          }}
          text={saveLabel}
          variant='callback'
        />
      </VStack>
    </ScrollView>
  )
}

export default TapToPairList
