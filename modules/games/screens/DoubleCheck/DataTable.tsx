import { SingleDataTable } from 'appdeptus/components'
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
    <SingleDataTable
      data={[
        {
          title: 'Points',
          value: String(army.points)
        },
        {
          title: 'Warlord',
          value: warlord?.name ?? ''
        },
        {
          title: 'Units',
          value: String(units)
        },
        {
          title: 'Models',
          value: String(models)
        }
      ]}
    />
  )
}

export default memo(DataTable)
