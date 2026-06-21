import { Pressable, Text, UnitListItem, VStack } from 'appdeptus/components'
import {
  getTeamAttachers,
  type Embarked,
  type Leader,
  type Squad,
  type Support,
  type Team
} from 'appdeptus/models'
import { type CreateGame } from 'appdeptus/models/game'
import { useGetUnitAttachmentsQuery } from 'appdeptus/modules/armies/api'
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

const AttachedUnitSelectionList = () => {
  const { setValue, watch } = useFormContext<CreateGame>()

  const units = watch('playerOne.army.roster')

  const leaders = useMemo(
    () =>
      sortBy(
        units.filter<Leader>((unit): unit is Leader => unit.type === 'leader'),
        ({ name }) => name
      ),
    [units]
  )

  const supports = useMemo(
    () =>
      sortBy(
        units.filter<Support>(
          (unit): unit is Support => unit.type === 'support'
        ),
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

  const attacherIds = useMemo(
    () => [...leaders, ...supports].map((u) => u.id),
    [leaders, supports]
  )

  const { data: attachments = {}, isSuccess } = useGetUnitAttachmentsQuery(attacherIds)

  const visibleLeaders = useMemo(
    () => (isSuccess ? leaders.filter((l) => (attachments[l.id]?.length ?? 0) > 0) : leaders),
    [attachments, isSuccess, leaders]
  )

  const visibleSupports = useMemo(
    () => (isSuccess ? supports.filter((s) => (attachments[s.id]?.length ?? 0) > 0) : supports),
    [attachments, isSuccess, supports]
  )

  const visibleSquadIds = useMemo(() => {
    if (!isSuccess) return undefined
    const ids = new Set<number>()
    ;[...visibleLeaders, ...visibleSupports].forEach((u) => {
      attachments[u.id]?.forEach((id) => ids.add(id))
    })
    return ids
  }, [attachments, isSuccess, visibleLeaders, visibleSupports])

  const visibleSquads = useMemo(
    () => (visibleSquadIds ? squads.filter((s) => visibleSquadIds.has(s.id)) : squads),
    [squads, visibleSquadIds]
  )

  const [selectedAttacher, setSelectedAttacher] = useState<Leader | Support>()

  const joinableSquadIds = selectedAttacher
    ? attachments[selectedAttacher.id]
    : undefined

  const canAddToTeam = useCallback(
    (team: Team): boolean => {
      if (!selectedAttacher) return false
      if (team.attachment === 'both') return false
      if (selectedAttacher.type === 'leader' && 'leader' in team) return false
      if (selectedAttacher.type === 'support' && 'support' in team) return false
      if (joinableSquadIds && !joinableSquadIds.includes(team.bodyguard.id)) return false
      return true
    },
    [joinableSquadIds, selectedAttacher]
  )

  const handlePress = useCallback(
    (unit: Unit) => {
      switch (unit.type) {
        case 'leader':
        case 'support': {
          setSelectedAttacher(
            selectedAttacher?.selectionId === unit.selectionId
              ? undefined
              : unit
          )
          break
        }
        case 'squad': {
          if (selectedAttacher) {
            const team =
              selectedAttacher.type === 'leader'
                ? ({
                    id: Crypto.randomUUID(),
                    type: 'team',
                    attachment: 'leader',
                    leader: selectedAttacher,
                    bodyguard: unit
                  } satisfies Team)
                : ({
                    id: Crypto.randomUUID(),
                    type: 'team',
                    attachment: 'support',
                    support: selectedAttacher,
                    bodyguard: unit
                  } satisfies Team)

            setValue('playerOne.army.roster', [
              ...units.filter(
                (u) =>
                  u.type === 'embarked' ||
                  u.type === 'team' ||
                  (u.selectionId !== selectedAttacher.selectionId &&
                    u.selectionId !== unit.selectionId)
              ),
              team
            ])
            setSelectedAttacher(undefined)
          }
          break
        }
        case 'team': {
          if (selectedAttacher && canAddToTeam(unit)) {
            const upgraded: Team =
              selectedAttacher.type === 'leader'
                ? {
                    ...unit,
                    attachment: 'both',
                    leader: selectedAttacher,
                    support: (unit as Extract<Team, { attachment: 'support' }>).support
                  }
                : {
                    ...unit,
                    attachment: 'both',
                    support: selectedAttacher,
                    leader: (unit as Extract<Team, { attachment: 'leader' }>).leader
                  }

            setValue('playerOne.army.roster', [
              ...units.filter(
                (u) =>
                  u.type !== 'team' ||
                  u.id !== unit.id
              ).filter(
                (u) =>
                  u.type === 'team' ||
                  u.type === 'embarked' ||
                  u.selectionId !== selectedAttacher.selectionId
              ),
              upgraded
            ])
            setSelectedAttacher(undefined)
          } else if (!selectedAttacher) {
            setValue('playerOne.army.roster', [
              ...units.filter(({ id }) => id !== unit.id),
              ...getTeamAttachers(unit),
              unit.bodyguard
            ])
          }
          break
        }
      }
    },
    [canAddToTeam, selectedAttacher, setValue, units]
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
      {visibleLeaders.length ? <StickyHeader>Leaders</StickyHeader> : null}
      {visibleLeaders.length ? (
      <VStack
        className='py-4'
        space='md'
      >
        {visibleLeaders.map((leader) => (
          <Pressable
            key={leader.selectionId}
            onPress={() => {
              handlePress(leader)
            }}
          >
            <UnitListItem
              item={leader}
              variant={
                !selectedAttacher
                  ? 'selectable'
                  : selectedAttacher.selectionId === leader.selectionId
                    ? 'selected'
                    : 'disabled'
              }
            />
          </Pressable>
        ))}
      </VStack>
      ) : null}
      {visibleSupports.length ? <StickyHeader>Supports</StickyHeader> : null}
      {visibleSupports.length ? (
        <VStack
          className='py-4'
          space='md'
        >
          {visibleSupports.map((support) => (
            <Pressable
              key={support.selectionId}
              onPress={() => {
                handlePress(support)
              }}
            >
              <UnitListItem
                item={support}
                variant={
                  !selectedAttacher
                    ? 'selectable'
                    : selectedAttacher.selectionId === support.selectionId
                      ? 'selected'
                      : 'disabled'
                }
              />
            </Pressable>
          ))}
        </VStack>
      ) : null}
      {visibleSquads.length ? <StickyHeader>Troops</StickyHeader> : null}
      {visibleSquads.length ? (
      <VStack
        className='py-4'
        space='md'
      >
        {visibleSquads.map((squad) => {
          const isJoinable =
            !joinableSquadIds || joinableSquadIds.includes(squad.id)
          return (
            <Pressable
              disabled={!selectedAttacher || !isJoinable}
              key={squad.selectionId}
              onPress={() => {
                handlePress(squad)
              }}
            >
              <UnitListItem
                item={squad}
                variant={
                  selectedAttacher && isJoinable ? 'selectable' : 'disabled'
                }
              />
            </Pressable>
          )
        })}
      </VStack>
      ) : null}
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

type Unit = Leader | Support | Squad | Team

const stickyHeaderIndices = [0, 2, 4, 6]

export default memo(AttachedUnitSelectionList)
