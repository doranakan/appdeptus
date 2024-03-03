import CreateArmyHeader from './CreateArmyHeader'
import UpdateArmyHeader from './UpdateArmyHeader'

type UnitListHeaderProps = {
  armyId?: string
  codexId: string
}

const UnitListHeader = ({ armyId, codexId }: UnitListHeaderProps) => {
  if (armyId) {
    return (
      <UpdateArmyHeader
        armyId={armyId}
        codexId={codexId}
      />
    )
  }
  return <CreateArmyHeader />
}

export default UnitListHeader
