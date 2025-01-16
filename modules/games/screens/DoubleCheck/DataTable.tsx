import { GameDataTable } from 'appdeptus/components'
import { useModelCount, useUnitCount, useWarlord } from 'appdeptus/hooks'
import { type CreateGame } from 'appdeptus/models/game'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'

const DataTable = () => {
  const { watch } = useFormContext<CreateGame>()
  const army = watch('playerOne.army')

  const warlord = useWarlord(army.roster)

  const units = useUnitCount(army.roster)

  const models = useModelCount(army.roster)

  return (
    <GameDataTable
      data={[
        {
          title: 'Points',
          valueL: String(army.points),
          valueR: ''
        },
        {
          title: 'Warlord',
          valueL: warlord?.name ?? '',
          valueR: ''
        },
        {
          title: 'Units',
          valueL: String(units),
          valueR: ''
        },
        {
          title: 'Models',
          valueL: String(models),
          valueR: ''
        }
      ]}
    />
  )
}

export default memo(DataTable)
