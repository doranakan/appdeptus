import { Button, ButtonGroup, ButtonText } from '@gluestack-ui/themed'
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
        $active-bg={selectedTierIndex === index ? '$blue300' : '$blue400'}
        backgroundColor={selectedTierIndex === index ? '$blue500' : '$blue300'}
        borderColor='$blue500'
        borderWidth='$1'
        key={`${tier.id}-${index}`}
        flex={1}
        onPress={() => {
          onTierSelected(tier)
        }}
      >
        <ButtonText>{tier.points}</ButtonText>
      </Button>
    ))}
  </ButtonGroup>
)

export default TierSelector
