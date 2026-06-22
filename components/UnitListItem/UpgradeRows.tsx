import { type UnitUpgrade } from 'appdeptus/models'
import Dots from '../Dots'
import Text from '../Text'
import { HStack } from '../ui'
import useGroupedUpgrades from './useGroupedUpgrades'

type UpgradeRowsProps = {
  upgrades: UnitUpgrade[]
}

const UpgradeRows = ({ upgrades }: UpgradeRowsProps) =>
  useGroupedUpgrades(upgrades).map(({ upgrade, count }) => (
    <HStack
      key={upgrade.id}
      space='sm'
    >
      <Text size='sm'>{`${count}x ${upgrade.name}`}</Text>
      <Dots />
      <Text
        className='uppercase'
        family='body-bold'
        size='sm'
      >{`${count * upgrade.points}pts`}</Text>
    </HStack>
  ))

export default UpgradeRows
