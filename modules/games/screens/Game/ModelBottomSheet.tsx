import { ButtonGroup } from 'appdeptus/components'
import { type GameArmy, type GameTeam, type GameUnit } from 'appdeptus/models'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { BottomSheet } from '../../../../components/BottomSheet'
import Button from '../../../../components/Button'
import Text from '../../../../components/Text'
import { HStack, VStack } from '../../../../components/ui'
import UnitName from '../../../../components/UnitName'
import Model from './Model'
import ref from './ref'

type ModelBottomSheetProps = {
  loading: boolean
  onStatusUpdated: (unit: GameArmy['roster'][number]) => Promise<void>
  unit: GameArmy['roster'][number]

  editable?: boolean
}

const ModelBottomSheet = ({
  loading,
  onStatusUpdated,
  unit: initialUnit,

  editable
}: ModelBottomSheetProps) => {
  const [unit, setUnit] = useState(initialUnit)

  useEffect(() => {
    setUnit(initialUnit)
  }, [initialUnit])

  const setKilledModel = useCallback(
    (id: string, killed: boolean, index: number) => {
      switch (unit.type) {
        case 'embarked':
          setUnit({
            ...unit,
            transport: {
              ...unit.transport,
              models: updateKilledModels(unit.transport.models, index, killed)
            },
            crew: unit.crew.map((embarked) => {
              if (embarked.type === 'team') {
                if (embarked.bodyguard.selectionId === id) {
                  return {
                    ...embarked,
                    bodyguard: {
                      ...embarked.bodyguard,
                      models: updateKilledModels(
                        embarked.bodyguard.models,
                        index,
                        killed
                      )
                    }
                  }
                }
                if (embarked.leader.selectionId === id) {
                  return {
                    ...embarked,
                    leader: {
                      ...embarked.leader,
                      models: updateKilledModels(
                        embarked.leader.models,
                        index,
                        killed
                      )
                    }
                  }
                }
                return embarked
              }
              return {
                ...embarked,
                models: updateKilledModels(embarked.models, index, killed)
              }
            })
          })

          return
        case 'team':
          if (id === unit.bodyguard.selectionId) {
            setUnit({
              ...unit,
              bodyguard: {
                ...unit.bodyguard,
                models: updateKilledModels(unit.bodyguard.models, index, killed)
              }
            })
            return
          }
          if (id === unit.leader.selectionId) {
            setUnit({
              ...unit,
              leader: {
                ...unit.leader,
                models: updateKilledModels(unit.leader.models, index, killed)
              }
            })
            return
          }
          return
        default:
          setUnit({
            ...unit,
            models: updateKilledModels(unit.models, index, killed)
          })
      }
    },
    [unit]
  )

  const setWoundedModel = useCallback(
    (id: string, wounds: number, index: number) => {
      switch (unit.type) {
        case 'embarked':
          setUnit({
            ...unit,
            transport: {
              ...unit.transport,
              models: updateWoundedModels(unit.transport.models, index, wounds)
            },
            crew: unit.crew.map((embarked) => {
              if (embarked.type === 'team') {
                if (embarked.bodyguard.selectionId === id) {
                  return {
                    ...embarked,
                    bodyguard: {
                      ...embarked.bodyguard,
                      models: updateWoundedModels(
                        embarked.bodyguard.models,
                        index,
                        wounds
                      )
                    }
                  }
                }
                if (embarked.leader.selectionId === id) {
                  return {
                    ...embarked,
                    leader: {
                      ...embarked.leader,
                      models: updateWoundedModels(
                        embarked.leader.models,
                        index,
                        wounds
                      )
                    }
                  }
                }
                return embarked
              }
              return {
                ...embarked,
                models: updateWoundedModels(embarked.models, index, wounds)
              }
            })
          })
          return
        case 'team':
          if (id === unit.bodyguard.selectionId) {
            setUnit({
              ...unit,
              bodyguard: {
                ...unit.bodyguard,
                models: updateWoundedModels(
                  unit.bodyguard.models,
                  index,
                  wounds
                )
              }
            })
            return
          }
          if (id === unit.leader.selectionId) {
            setUnit({
              ...unit,
              leader: {
                ...unit.leader,
                models: updateWoundedModels(unit.leader.models, index, wounds)
              }
            })
            return
          }
          return
        default:
          setUnit({
            ...unit,
            models: updateWoundedModels(unit.models, index, wounds)
          })
      }
    },
    [unit]
  )

  const models = useMemo(() => {
    switch (unit.type) {
      case 'embarked':
        return (
          <VStack space='md'>
            <Unit
              unit={unit.transport}
              setWounds={setWoundedModel}
              setKilled={(_id, killed, index) => {
                setUnit({
                  ...unit,
                  transport: {
                    ...unit.transport,
                    models: unit.transport.models.map((m, i) => {
                      if (i === index) {
                        return {
                          ...m,
                          killed
                        }
                      }
                      return m
                    })
                  }
                })
              }}
              editable={editable}
            />
            {unit.crew.map((u, i) => {
              if (u.type === 'team') {
                return (
                  <Team
                    key={`${u.leader.name}${u.bodyguard.name}-${i}`}
                    setKilled={setKilledModel}
                    setWounds={setWoundedModel}
                    team={u}
                    editable={editable}
                  />
                )
              }
              return (
                <Unit
                  setKilled={setKilledModel}
                  setWounds={setWoundedModel}
                  key={`${u.name}-i`}
                  unit={u}
                  editable={editable}
                />
              )
            })}
          </VStack>
        )

      case 'team':
        return (
          <Team
            setKilled={setKilledModel}
            setWounds={setWoundedModel}
            team={unit}
            editable={editable}
          />
        )

      default:
        return (
          <Unit
            setKilled={setKilledModel}
            setWounds={setWoundedModel}
            unit={unit}
            editable={editable}
          />
        )
    }
  }, [editable, setKilledModel, setWoundedModel, unit])

  return (
    <BottomSheet
      dismissDisabled={editable}
      ref={ref}
      StickyHeader={
        editable ? (
          <HStack className='justify-end p-4'>
            <ButtonGroup>
              <Button
                color='secondary'
                variant='callback'
                onPress={() => {
                  ref.current?.dismiss()
                }}
                text='discard'
                size='sm'
              />
              <Button
                variant='callback'
                loading={loading}
                disabled={loading}
                onPress={async () => {
                  await onStatusUpdated(unit)
                }}
                text='save'
                size='sm'
              />
            </ButtonGroup>
          </HStack>
        ) : null
      }
    >
      <VStack space='md'>{models}</VStack>
    </BottomSheet>
  )
}

const updateKilledModels = (
  models: GameUnit['models'],
  index: number,
  killed: boolean
) =>
  models.map((u, i) => {
    if (i === index) {
      return {
        ...u,
        killed
      }
    }
    return u
  })

const updateWoundedModels = (
  models: GameUnit['models'],
  index: number,
  wounds: number
) =>
  models.map((u, i) => {
    if (i === index) {
      return {
        ...u,
        wounds
      }
    }
    return u
  })

type StatusHandlers = {
  setWounds: (id: string, wounds: number, index: number) => void
  setKilled: (id: string, killed: boolean, index: number) => void
}

type TeamProps = {
  team: GameTeam

  editable?: boolean
} & StatusHandlers

const Team = ({ editable, team, ...handlers }: TeamProps) => (
  <>
    <Text
      className='uppercase'
      family='body-bold'
    >
      {`${team.leader.name} & ${team.bodyguard.name}`}
    </Text>

    <Unit
      editable={editable}
      unit={team.leader}
      {...handlers}
    />

    <Unit
      editable={editable}
      unit={team.bodyguard}
      {...handlers}
    />
  </>
)

type UnitProps = {
  unit: GameUnit

  editable?: boolean
} & StatusHandlers

const Unit = ({ editable, setKilled, setWounds, unit }: UnitProps) => (
  <>
    <UnitName {...unit} />
    {unit.models.map((model, index) => (
      <Model
        editable={editable}
        onPressMinus={(wounds) => {
          setWounds(unit.selectionId, wounds, index)
        }}
        onPressPlus={(wounds) => {
          setWounds(unit.selectionId, wounds, index)
        }}
        onPressSkull={(killed) => {
          setKilled(unit.selectionId, killed, index)
        }}
        key={`${unit.name}-${index}`}
        index={index}
        {...model}
      />
    ))}
  </>
)

export default memo(ModelBottomSheet)
