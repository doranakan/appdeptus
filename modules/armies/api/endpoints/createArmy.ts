import { type CoreEndpointBuilder } from 'appdeptus/api'
import {
  type Army,
  type ArmyBuilder,
  type Character,
  type Leader,
  type Squad,
  type Team,
  type Transport,
  type Vehicle
} from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import ArmiesApiTag from '../tags'

const createArmy = (builder: CoreEndpointBuilder<ArmiesApiTag>) =>
  builder.mutation<null, ArmyBuilder>({
    queryFn: async ({ codex, detachment, units, warlord, id: _, ...rest }) => {
      try {
        const leaders = units.filter<Leader>(
          (unit): unit is Leader =>
            unit.type === 'leader' && warlord.id !== unit.id
        )

        const squads = units.filter<Squad>(
          (unit): unit is Squad => unit.type === 'squad'
        )

        const composition: Army['composition'] = {
          characters: units.filter<Character>(
            (unit): unit is Character =>
              unit.type === 'character' && warlord.id !== unit.id
          ),
          leaders: leaders.filter((leader) => !leader.teamId),
          squads: squads.filter((squad) => !squad.teamId),
          transports: units.filter<Transport>(
            (unit): unit is Transport => unit.type === 'transport'
          ),
          vehicles: units.filter<Vehicle>(
            (unit): unit is Vehicle => unit.type === 'vehicle'
          ),
          teams: leaders
            .reduce<Team[]>((acc, leader) => {
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
            }, [])
            .filter(({ id }) => id !== warlord.id),
          detachment,
          warlord
        }

        const { data, error: armiesError } = await supabase
          .from(Table.ARMIES)
          .insert({
            ...rest,
            composition,
            codex: codex.id
          })

        if (armiesError) {
          return { error: armiesError }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: [ArmiesApiTag.ARMY_LIST]
  })

export default createArmy
