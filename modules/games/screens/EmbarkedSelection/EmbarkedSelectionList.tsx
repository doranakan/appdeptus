import { Pressable, Text, UnitListItem, VStack } from 'appdeptus/components'
import {
  type Character,
  type Embarked,
  type Leader,
  type Squad,
  type Team,
  type Transport
} from 'appdeptus/models'
import { type NewGame } from 'appdeptus/models/game'
import * as Crypto from 'expo-crypto'
import {
  memo,
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from 'react'
import { useFormContext } from 'react-hook-form'
import { ScrollView } from 'react-native'
import EmbarkedUnitsBottomSheet from './EmbarkedUnitBottomSheet'
import ref from './ref'

const EmbarkedSelectionList = () => {
  const { setValue, watch } = useFormContext<NewGame>()

  const units = watch('playerOne.army.roster')

  const embarkableUnits = useMemo(
    () =>
      units.filter<Character | Leader | Squad | Team>(
        (unit): unit is Character | Leader | Squad | Team =>
          unit.type === 'character' ||
          unit.type === 'leader' ||
          unit.type === 'squad' ||
          unit.type === 'team'
      ),
    [units]
  )

  const transports = useMemo(
    () =>
      units.filter<Transport>(
        (unit): unit is Transport => unit.type === 'transport'
      ),
    [units]
  )

  const embarkeds = useMemo(
    () =>
      units.filter<Embarked>(
        (unit): unit is Embarked => unit.type === 'embarked'
      ),
    [units]
  )

  const [selectedTransport, setSelectedTransport] = useState<
    Transport | Embarked
  >()

  const handlePress = useCallback(
    (unit: (typeof units)[0]) => {
      switch (unit.type) {
        case 'embarked': {
          if (selectedTransport) {
            ref.current?.present()
            return
          }

          setSelectedTransport(unit)

          return
        }
        case 'transport': {
          if (selectedTransport) {
            setSelectedTransport(undefined)
            return
          }
          setSelectedTransport(unit)
          return
        }

        default: {
          if (selectedTransport) {
            if (selectedTransport.type === 'embarked') {
              setValue('playerOne.army.roster', [
                ...units
                  .filter((u) => {
                    switch (u.type) {
                      case 'embarked':
                      case 'team':
                        return unit.type !== 'team' || u.id !== unit.id

                      default:
                        return (
                          unit.type === 'team' ||
                          u.selectionId !== unit.selectionId
                        )
                    }
                  })
                  .map((u) => {
                    if (u.id === selectedTransport.id) {
                      return {
                        ...selectedTransport,
                        crew: [...selectedTransport.crew, unit]
                      }
                    }

                    return u
                  })
              ])

              setSelectedTransport(undefined)

              return
            }

            const embarked = {
              crew: [unit],
              id: Crypto.randomUUID(),
              transport: selectedTransport,
              type: 'embarked'
            } satisfies Embarked

            setValue('playerOne.army.roster', [
              ...units.filter((u) => {
                switch (u.type) {
                  case 'transport':
                    return u.selectionId !== selectedTransport.selectionId

                  case 'embarked':
                  case 'team':
                    return unit.type !== 'team' || u.id !== unit.id

                  default:
                    return (
                      unit.type === 'team' || u.selectionId !== unit.selectionId
                    )
                }
              }),
              embarked
            ])

            setSelectedTransport(undefined)
          }
        }
      }
    },
    [selectedTransport, setValue, units]
  )

  return (
    <ScrollView
      stickyHeaderIndices={stickyHeaderIndices}
      showsVerticalScrollIndicator={false}
    >
      {embarkeds.length ? <StickyHeader>embarked units</StickyHeader> : null}
      {embarkeds.length ? (
        <VStack
          className='py-4'
          space='md'
        >
          {embarkeds.map((embarked) => (
            <Pressable
              key={embarked.id}
              onPress={() => {
                handlePress(embarked)
              }}
            >
              <UnitListItem
                item={embarked}
                variant={selectedTransport ? 'selected' : 'default'}
              />
            </Pressable>
          ))}
        </VStack>
      ) : null}
      <StickyHeader>transports</StickyHeader>
      <VStack
        className='py-4'
        space='md'
      >
        {transports.map((transport) => (
          <Pressable
            key={transport.selectionId}
            onPress={() => {
              handlePress(transport)
            }}
          >
            <UnitListItem
              item={transport}
              variant={
                !selectedTransport
                  ? 'selectable'
                  : selectedTransport.type === 'transport' &&
                      selectedTransport.selectionId === transport.selectionId
                    ? 'selected'
                    : 'disabled'
              }
            />
          </Pressable>
        ))}
      </VStack>
      <StickyHeader>units</StickyHeader>
      <VStack
        className='py-4'
        space='md'
      >
        {embarkableUnits.map((embarkableUnit) => (
          <Pressable
            disabled={!selectedTransport}
            key={
              embarkableUnit.type === 'team'
                ? embarkableUnit.id
                : embarkableUnit.selectionId
            }
            onPress={() => {
              handlePress(embarkableUnit)
            }}
          >
            <UnitListItem
              item={embarkableUnit}
              variant={selectedTransport ? 'selectable' : 'disabled'}
            />
          </Pressable>
        ))}
      </VStack>
      {selectedTransport ? (
        <EmbarkedUnitsBottomSheet
          selectedTransport={selectedTransport}
          onPressUnit={(unit) => {
            setValue('playerOne.army.roster', [
              ...units.map((u) => {
                if (
                  u.id === selectedTransport.id &&
                  selectedTransport.type === 'embarked'
                ) {
                  const crew = selectedTransport.crew.filter(
                    (c) => c.id !== unit.id
                  )

                  if (!crew.length) {
                    ref.current?.dismiss()

                    setSelectedTransport(undefined)

                    return selectedTransport.transport
                  }

                  const embarked = {
                    ...selectedTransport,
                    crew
                  }

                  setSelectedTransport(embarked)

                  return embarked
                }

                return u
              }),
              unit
            ])
          }}
        />
      ) : null}
    </ScrollView>
  )
}

const StickyHeader = ({ children }: PropsWithChildren) => (
  <Text
    className='uppercase'
    family='body-bold'
  >
    {children}
  </Text>
)

const stickyHeaderIndices = [0, 2, 4]

export default memo(EmbarkedSelectionList)
