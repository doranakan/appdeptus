import {
  type ArmyBuilder,
  type Character,
  type Leader,
  type Squad,
  type Team,
  type Transport,
  type Vehicle
} from 'appdeptus/models'

const mapArmyBuilderToArmyComposition = ({
  detachment,
  units
}: ArmyBuilder) => {
  const leaders = units.filter<Leader>(
    (unit): unit is Leader => unit.type === 'leader'
  )

  const squads = units.filter<Squad>(
    (unit): unit is Squad => unit.type === 'squad'
  )

  return {
    characters: units.filter<Character>(
      (unit): unit is Character => unit.type === 'character'
    ),
    leaders: leaders.filter((leader) => !leader.teamId),
    squads: squads.filter((squad) => !squad.teamId),
    transports: units.filter<Transport>(
      (unit): unit is Transport => unit.type === 'transport'
    ),
    vehicles: units.filter<Vehicle>(
      (unit): unit is Vehicle => unit.type === 'vehicle'
    ),
    teams: leaders.reduce<Team[]>((acc, leader) => {
      if (leader.teamId) {
        const bodyguard = squads.find(({ teamId }) => teamId === leader.teamId)
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
    detachment
  }
}

export { mapArmyBuilderToArmyComposition }
