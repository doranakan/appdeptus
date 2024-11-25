import { Pressable, Text, UnitListItem, VStack } from 'appdeptus/components'
import {
  type Embarked,
  type Leader,
  type Squad,
  type Team
} from 'appdeptus/models'
import { type NewGame } from 'appdeptus/models/game'
import * as Crypto from 'expo-crypto'
import { sortBy } from 'lodash'
import {
  memo,
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from 'react'
import { useFormContext } from 'react-hook-form'
import { ScrollView } from 'react-native'

const LeaderSelectionList = () => {
  const { setValue, watch } = useFormContext<NewGame>()

  const units = watch('playerOne.army.roster')

  const leaders = useMemo(
    () =>
      sortBy(
        units.filter<Leader>((unit): unit is Leader => unit.type === 'leader'),
        ({ name }) => name
      ),
    [units]
  )

  const squads = useMemo(
    () =>
      sortBy(
        units.filter<Squad>((unit): unit is Squad => unit.type === 'squad'),
        ({ name }) => name
      ),
    [units]
  )

  const teams = useMemo(
    () => units.filter<Team>((unit): unit is Team => unit.type === 'team'),
    [units]
  )

  const embarked = useMemo(
    () =>
      units.filter<Embarked>(
        (unit): unit is Embarked => unit.type === 'embarked'
      ),
    [units]
  )

  const [selectedLeader, setSelectedLeader] = useState<Leader>()

  const handlePress = useCallback(
    (unit: Unit) => {
      switch (unit.type) {
        case 'leader': {
          setSelectedLeader(!selectedLeader ? unit : undefined)

          break
        }
        case 'squad': {
          if (selectedLeader) {
            const team = {
              id: Crypto.randomUUID(),
              bodyguard: unit,
              leader: selectedLeader,
              type: 'team'
            } satisfies Team

            setValue('playerOne.army.roster', [
              ...units.filter(
                (u) =>
                  u.type === 'embarked' ||
                  u.type === 'team' ||
                  (u.selectionId !== selectedLeader.selectionId &&
                    u.selectionId !== unit.selectionId)
              ),
              team
            ])
            setSelectedLeader(undefined)
          }

          break
        }
        case 'team': {
          setValue('playerOne.army.roster', [
            ...units.filter(({ id }) => id !== unit.id),
            unit.leader,
            unit.bodyguard
          ])

          break
        }
      }
    },
    [selectedLeader, setValue, units]
  )

  return (
    <ScrollView
      stickyHeaderIndices={stickyHeaderIndices}
      showsVerticalScrollIndicator={false}
    >
      {teams.length ? <StickyHeader>Teams</StickyHeader> : null}
      {teams.length ? (
        <VStack
          className='py-4'
          space='md'
        >
          {teams.map((team) => (
            <Pressable
              key={team.id}
              onPress={() => {
                handlePress(team)
              }}
            >
              <UnitListItem item={team} />
            </Pressable>
          ))}
        </VStack>
      ) : null}
      <StickyHeader>Leaders</StickyHeader>
      <VStack
        className='py-4'
        space='md'
      >
        {leaders.map((leader) => (
          <Pressable
            key={leader.selectionId}
            onPress={() => {
              handlePress(leader)
            }}
          >
            <UnitListItem
              item={leader}
              variant={
                !selectedLeader
                  ? 'selectable'
                  : selectedLeader.selectionId === leader.selectionId
                    ? 'selected'
                    : 'disabled'
              }
            />
          </Pressable>
        ))}
      </VStack>
      <StickyHeader>Squads</StickyHeader>
      <VStack
        className='py-4'
        space='md'
      >
        {squads.map((squad) => (
          <Pressable
            disabled={!selectedLeader}
            key={squad.selectionId}
            onPress={() => {
              handlePress(squad)
            }}
          >
            <UnitListItem
              item={squad}
              variant={selectedLeader ? 'selectable' : 'disabled'}
            />
          </Pressable>
        ))}
      </VStack>
      {embarked.length ? <StickyHeader>Embarked</StickyHeader> : null}
      {embarked.length ? (
        <VStack
          className='py-4'
          space='md'
        >
          {embarked.map((unit) => (
            <UnitListItem
              key={unit.id}
              item={unit}
              variant='disabled'
            />
          ))}
        </VStack>
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

type Unit = Leader | Squad | Team

const stickyHeaderIndices = [0, 2, 4]

export default memo(LeaderSelectionList)
