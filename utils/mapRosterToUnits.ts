import {
  type Army,
  type GameArmy,
  type GameUnit,
  type Unit
} from 'appdeptus/models'

const mapRosterToUnits = (units: Army['roster'] | GameArmy['roster']) =>
  units.reduce<(Unit | GameUnit)[]>((acc, curr) => {
    switch (curr.type) {
      case 'embarked':
        return [
          ...acc,
          curr.transport,
          ...curr.crew.flatMap((embarked) =>
            embarked.type === 'team'
              ? [embarked.leader, embarked.bodyguard]
              : embarked
          )
        ]

      case 'team':
        return [...acc, curr.leader, curr.bodyguard]

      default:
        return [...acc, curr]
    }
  }, [])

export default mapRosterToUnits
