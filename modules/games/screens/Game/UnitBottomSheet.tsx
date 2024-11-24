import {
  BottomSheet,
  Button,
  ButtonGroup,
  Card,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack
} from 'appdeptus/components'
import {
  type Army,
  type Embarked,
  type Team,
  type Unit
} from 'appdeptus/models'
import clsx from 'clsx'
import { uniqueId } from 'lodash'
import { Minus, Plus, Skull } from 'lucide-react-native'
import { singular } from 'pluralize'
import { type PropsWithChildren, useMemo } from 'react'
import ref from './ref'

type UnitBottomSheetProps = {
  unit?: Army['roster'][0]
}

const UnitBottomSheet = ({ unit }: UnitBottomSheetProps) => {
  if (!unit) {
    return null
  }

  return (
    <BottomSheet
      ref={ref}
      onPressBackdrop={() => ref.current?.dismiss()}
    >
      {unit.type === 'embarked' ? (
        <EmbarkedContainer embarked={unit} />
      ) : unit.type === 'team' ? (
        <TeamContainer team={unit} />
      ) : (
        <UnitContainer unit={unit} />
      )}
    </BottomSheet>
  )
}

type UnitContainerProps = {
  unit: Unit
}

const UnitContainer = ({ unit }: UnitContainerProps) => {
  const models = useMemo(
    () =>
      Array.from(new Array(unit.tier.models), () => ({
        id: uniqueId(),
        name: singular(unit.name),
        wounds: 0,
        dead: false
      })),
    [unit.name, unit.tier.models]
  )

  return (
    <VStack space='md'>
      <Text
        className='line-clamp-1 text-center'
        numberOfLines={1}
        family='body-bold'
      >
        {unit.name}
      </Text>
      {models.map((model) => (
        <Model
          key={model.id}
          model={model}
        />
      ))}
    </VStack>
  )
}

type TeamContainerProps = {
  team: Team
}

const TeamContainer = ({ team }: TeamContainerProps) => {
  const leaderModels = useMemo(
    () =>
      Array.from(new Array(team.leader.tier.models), () => ({
        id: uniqueId(),
        name: singular(team.leader.name),
        wounds: 0,
        dead: false
      })),
    [team.leader.name, team.leader.tier.models]
  )
  const bodyguardModels = useMemo(
    () =>
      Array.from(new Array(team.bodyguard.tier.models), () => ({
        id: uniqueId(),
        name: singular(team.bodyguard.name),
        wounds: 0,
        dead: false
      })),
    [team.bodyguard.name, team.bodyguard.tier.models]
  )

  return (
    <VStack space='md'>
      <Text
        className='line-clamp-1 text-center'
        numberOfLines={1}
        family='body-bold'
      >
        {`${team.leader.name} & ${team.bodyguard.name}`}
      </Text>
      <Caption>leader unit models</Caption>
      {leaderModels.map((model) => (
        <Model
          key={model.id}
          model={model}
        />
      ))}
      <Caption>bodyguard unit models</Caption>
      {bodyguardModels.map((model) => (
        <Model
          key={model.id}
          model={model}
        />
      ))}
    </VStack>
  )
}

type EmbarkedContainerProps = {
  embarked: Embarked
}

const EmbarkedContainer = ({ embarked }: EmbarkedContainerProps) => {
  const transportModels = useMemo(
    () =>
      Array.from(new Array(embarked.transport.tier.models), () => ({
        id: uniqueId(),
        name: singular(embarked.transport.name),
        wounds: 0,
        dead: false
      })),
    [embarked.transport.name, embarked.transport.tier.models]
  )
  const embarkedModels = useMemo(
    () =>
      embarked.crew.map((unit) => {
        if (unit.type === 'team') {
          const leaderModels = Array.from(
            new Array(unit.leader.tier.models),
            () => ({
              id: uniqueId(),
              name: singular(unit.leader.name),
              wounds: 0,
              dead: false
            })
          )
          const bodyguardModels = Array.from(
            new Array(unit.bodyguard.tier.models),
            () => ({
              id: uniqueId(),
              name: singular(unit.bodyguard.name),
              wounds: 0,
              dead: false
            })
          )
          return {
            bodyguardModels,
            leaderModels,
            name: `${unit.leader.name} & bodyguard models`,
            type: 'team' as const
          }
        }

        return {
          models: Array.from(new Array(unit.tier.models), () => ({
            id: uniqueId(),
            name: singular(unit.name),
            wounds: 0,
            dead: false
          })),
          name: `${unit.name} models`,
          type: 'unit' as const
        }
      }),
    [embarked]
  )

  return (
    <VStack space='md'>
      <Text
        className='line-clamp-1 text-center'
        numberOfLines={1}
        family='body-bold'
      >
        {`${embarked.transport.name} & Crew`}
      </Text>
      <Caption>transport models</Caption>
      {transportModels.map((model) => (
        <Model
          key={model.id}
          model={model}
        />
      ))}
      {embarkedModels.map((unit, index) => (
        <VStack
          key={`${unit.name}-${index}`}
          space='md'
        >
          <Caption>{unit.name}</Caption>
          {unit.type === 'unit' ? (
            unit.models.map((model) => (
              <Model
                key={model.id}
                model={model}
              />
            ))
          ) : (
            <VStack space='md'>
              <Caption>leader unit models</Caption>
              {unit.leaderModels.map((model) => (
                <Model
                  key={model.id}
                  model={model}
                />
              ))}
              <Caption>bodyguard unit models</Caption>
              {unit.bodyguardModels.map((model) => (
                <Model
                  key={model.id}
                  model={model}
                />
              ))}
            </VStack>
          )}
        </VStack>
      ))}
    </VStack>
  )
}

type ModelProps = {
  model: {
    id: string
    name: string
    wounds: number
    dead: boolean
  }
}

const Caption = ({ children }: PropsWithChildren) => (
  <Text
    className='uppercase'
    family='body-bold'
    size='sm'
  >
    {children}
  </Text>
)

const Model = ({ model }: ModelProps) => (
  <HStack space='md'>
    <Card>
      <HStack
        className='items-center p-4'
        space='md'
      >
        <VStack className='flex-1'>
          <Text family='body-bold'>{model.name}</Text>
          <Text size='sm'>
            <Text family='body-bold'>{model.wounds}</Text> Wounds suffered
          </Text>
        </VStack>
        <VStack>
          <ButtonGroup>
            <Button
              onPress={() => {}}
              icon={Plus}
              size='sm'
              variant='callback'
            />
            <Button
              disabled={!model.wounds}
              onPress={() => {}}
              icon={Minus}
              size='sm'
              variant='callback'
            />
          </ButtonGroup>
        </VStack>
        <Pressable onPress={() => {}}>
          <Icon
            as={Skull}
            className={clsx(
              model.dead ? 'text-tertiary-600' : 'text-tertiary-50'
            )}
          />
        </Pressable>
      </HStack>
    </Card>
  </HStack>
)

export default UnitBottomSheet
