import { ArmyRoster, TabMenu, VStack } from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { memo, useState } from 'react'
import EnhancementList from './EnhancementList'

type CompositionTabProps = {
  composition: Army['composition']
}

const CompositionTab = ({ composition }: CompositionTabProps) => {
  const [selectedTab, setSelectedTab] = useState<'units' | 'enhancement'>(
    'units'
  )

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
        <ArmyRoster composition={composition} />
      ) : (
        <EnhancementList enhancements={composition.detachment.enhancements} />
      )}
    </VStack>
  )
}

export default memo(CompositionTab)
