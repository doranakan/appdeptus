import { type CodexUnit } from 'appdeptus/models'
import CreateArmyHeader from './CreateArmyHeader'
import UpdateArmyHeader from './UpdateArmyHeader'

type UnitListHeaderProps = {
  army: Record<CodexUnit['id'], CodexUnit['tiers']>
  armyId?: string
  codexId: string
}

const UnitListHeader = ({ army, armyId, codexId }: UnitListHeaderProps) => {
  if (armyId) {
    return (
      <UpdateArmyHeader
        army={army}
        armyId={armyId}
        codexId={codexId}
      />
    )
  }
  return (
    <CreateArmyHeader
      army={army}
      codexId={codexId}
    />
  )
}

export default UnitListHeader
