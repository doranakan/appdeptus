import { Pressable, Text, UnitListItem, VStack } from 'appdeptus/components'
import {
  type ArmyBuilder,
  type Leader,
  type Squad,
  type Team
} from 'appdeptus/models'
import { sortBy, uniqueId } from 'lodash'
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
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const units = watch('units')

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
    () =>
      leaders.reduce<Team[]>((acc, leader) => {
        if (leader.teamId) {
          const bodyguard = squads.find(
            ({ teamId }) => teamId === leader.teamId
          )
          if (bodyguard) {
            return [
              ...acc,
              {
                id: leader.teamId,
                bodyguard,
                leader,
                type: 'team'
              }
            ]
          }
          return []
        }
        return acc
      }, []),
    [leaders, squads]
  )

  const leaderList = useMemo(
    () => leaders.filter(({ teamId }) => !teamId),
    [leaders]
  )
  const squadList = useMemo(
    () => squads.filter(({ teamId }) => !teamId),
    [squads]
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
            const teamId = uniqueId()

            setValue('units', [
              ...units.filter(
                ({ selectionId }) =>
                  selectionId !== unit.selectionId &&
                  selectionId !== selectedLeader?.selectionId
              ),
              { ...unit, teamId },
              { ...selectedLeader, teamId }
            ])
            setSelectedLeader(undefined)
          }

          break
        }
        case 'team': {
          setValue('units', [
            ...units.filter(
              ({ selectionId }) =>
                selectionId !== unit.bodyguard.selectionId &&
                selectionId !== unit.leader.selectionId
            ),
            { ...unit.bodyguard, teamId: undefined },
            { ...unit.leader, teamId: undefined }
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
          className='p-4 px-0'
          space='md'
        >
          {teams.map((team) => (
            <Pressable
              key={team.id}
              onPress={() => {
                handlePress(team)
              }}
            >
              <UnitListItem unitOrTeam={team} />
            </Pressable>
          ))}
        </VStack>
      ) : null}
      <StickyHeader>Leaders</StickyHeader>
      <VStack
        className='p-4 px-0'
        space='md'
      >
        {leaderList.map((leader) => (
          <Pressable
            key={leader.selectionId}
            onPress={() => {
              handlePress(leader)
            }}
          >
            <UnitListItem
              unitOrTeam={leader}
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
        className='p-4 px-0'
        space='md'
      >
        {squadList.map((squad) => (
          <Pressable
            disabled={!selectedLeader}
            key={squad.selectionId}
            onPress={() => {
              handlePress(squad)
            }}
          >
            <UnitListItem
              unitOrTeam={squad}
              variant={selectedLeader ? 'selectable' : 'disabled'}
            />
          </Pressable>
        ))}
      </VStack>
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
