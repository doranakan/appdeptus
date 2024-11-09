import { TabMenu, VStack } from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { memo, useMemo, useState } from 'react'
import EnhancementList from './EnhancementList'
import UnitList from './UnitList'

type CompositionTabProps = {
  composition: Army['composition']
}

const CompositionTab = ({ composition }: CompositionTabProps) => {
  const [selectedTab, setSelectedTab] = useState<'units' | 'enhancement'>(
    'units'
  )

  const units = useMemo(() => {
    const { characters, leaders, squads, teams, transports, vehicles } =
      composition

    return [
      ...teams,
      ...characters,
      ...leaders,
      ...squads,
      ...transports,
      ...vehicles
    ]
  }, [composition])

  return (
    <VStack
      className='flex-1'
      space='md'
    >
      <TabMenu
        onOptionSelected={setSelectedTab}
        options={['units', 'enhancement']}
      />
      {selectedTab === 'units' ? (
        <UnitList
          units={units}
          warlord={composition.warlord}
        />
      ) : (
        <EnhancementList enhancements={composition.detachment.enhancements} />
      )}
    </VStack>
  )
}

export default memo(CompositionTab)
