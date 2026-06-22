import { useModelsLeft, useTotalWounds } from 'appdeptus/hooks'
import { type GameArmy, type GameTeam, type GameUnit } from 'appdeptus/models'
import { ChevronsUp, CircleFadingPlus, Crown, Droplets, Skull } from 'lucide-react-native'
import pluralize from 'pluralize'
import { memo } from 'react'
import Card from '../Card'
import Dots from '../Dots'
import IconBadge from '../IconBadge'
import Text from '../Text'
import { HStack, VStack } from '../ui'
import { unitTypeToIcon } from '../utils'
import EmbarkedUnit from './EmbarkedUnit'
import EnhancementRow from './EnhancementRow'
import useGroupedUpgrades from './useGroupedUpgrades'
import UpgradeRows from './UpgradeRows'
import TeamUnit from './TeamUnit'

type GameUnitListItemProps = {
  item: GameArmy['roster'][number]
}

const GameUnitListItem = ({ item }: GameUnitListItemProps) => {
  const modelsLeft = useModelsLeft(item)

  switch (item.type) {
    case 'embarked':
      return (
        <Card variant={!modelsLeft ? 'selectable-alt' : 'default'}>
          <VStack
            className='p-4'
            space='md'
          >
            {item.crew.map((unit) => {
              if (unit.type === 'team') {
                return (
                  <EmbarkedUnit key={unit.id}>
                    <TeamDetail team={unit} />
                  </EmbarkedUnit>
                )
              }
              return (
                <EmbarkedUnit key={unit.selectionId}>
                  <UnitDetail unit={unit} />
                </EmbarkedUnit>
              )
            })}
            <UnitDetail unit={item.transport} />
          </VStack>
        </Card>
      )
    case 'team':
      return (
        <Card variant={!modelsLeft ? 'selectable-alt' : 'default'}>
          <VStack className='p-4'>
            <TeamDetail team={item} />
          </VStack>
        </Card>
      )

    default:
      return (
        <Card variant={!modelsLeft ? 'selectable-alt' : 'default'}>
          <VStack className='p-4'>
            <UnitDetail unit={item} />
          </VStack>
        </Card>
      )
  }
}

type UnitDetailProps = {
  unit: GameUnit
} & Omit<GameUnitListItemProps, 'item'>

const UnitDetail = ({ unit }: UnitDetailProps) => {
  const modelsLeft = useModelsLeft(unit)
  const totalWounds = useTotalWounds(unit)
  const hasUpgrades = useGroupedUpgrades(unit.upgrades).length > 0

  return (
    <HStack
      className='items-center'
      space='md'
    >
      <IconBadge
        Icon={!modelsLeft ? Skull : unit.warlord ? Crown : unitTypeToIcon[unit.type]}
        OptionIcon={
          totalWounds && modelsLeft
            ? Droplets
            : 'enhancement' in unit && unit.enhancement
              ? CircleFadingPlus
              : hasUpgrades
                ? ChevronsUp
                : undefined
        }
      />
      <VStack className='flex-1'>
        <Text
          family='body-bold'
          className='line-clamp-1'
        >
          {unit.name}
        </Text>
        <HStack space='sm'>
          <Text size='sm'>{`${modelsLeft}/${unit.models.length} ${pluralize('model', unit.models.length)}`}</Text>
          <Dots />
          <Text
            className='uppercase'
            family='body-bold'
            size='sm'
          >{`${unit.points}pts`}</Text>
        </HStack>
        {'enhancement' in unit && unit.enhancement ? (
          <EnhancementRow
            name={unit.enhancement.name}
            points={unit.enhancement.points}
          />
        ) : null}
        <UpgradeRows upgrades={unit.upgrades} />
      </VStack>
    </HStack>
  )
}

type TeamDetailProps = {
  team: GameTeam
}

const TeamDetail = ({ team }: TeamDetailProps) => (
  <TeamUnit
    BodyGuard={<UnitDetail unit={team.bodyguard} />}
    Leader={'leader' in team ? <UnitDetail unit={team.leader} /> : undefined}
    Support={'support' in team ? <UnitDetail unit={team.support} /> : undefined}
  />
)

export default memo(GameUnitListItem)
