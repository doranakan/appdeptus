import { ButtonGroup } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { Unit } from 'appdeptus/models'
import React from 'react'

type TierSelectorProps = {
  selectedTierIndex: number
  onTierSelected: (tier: Unit['tiers'][0]) => void
  tiers: Unit['tiers']
}

const TierSelector = ({
  selectedTierIndex: selectedTierIndex,
  onTierSelected,
  tiers
}: TierSelectorProps): JSX.Element => (
  <ButtonGroup flex={1} gap='$2'>
    {tiers.map((tier, index) => (
      <Button
        backgroundColor={selectedTierIndex === index ? '$info500' : '$info300'}
        borderColor='$info500'
        borderWidth='$1'
        key={`${tier.id}-${index}`}
        flex={1}
        onPress={() => {
          onTierSelected(tier)
        }}
        text={String(tier.points)}
      />
    ))}
  </ButtonGroup>
)

export default TierSelector
