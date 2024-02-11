import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed'
import {
  type CodexUnit,
  type UnitComposition,
  type UnitTier
} from 'appdeptus/models'

type TierSelectorProps = {
  onTierSelected: (tier: CodexUnit['tiers'][0]) => void
  selectedTierIndex: number
  unitCompositions: Record<UnitTier['id'], UnitComposition>
  unitTiers: UnitTier[]
}

const TierSelector = ({
  onTierSelected,
  selectedTierIndex,
  unitCompositions,
  unitTiers
}: TierSelectorProps): JSX.Element => (
  <VStack
    flex={1}
    gap='$2'
  >
    {unitTiers.map((tier, tierIndex) => {
      const isSelected = selectedTierIndex === tierIndex
      return (
        <Pressable
          $active-bgColor={isSelected ? '$info200' : '$info100'}
          backgroundColor={isSelected ? '$info200' : '$info50'}
          borderColor={isSelected ? '$info500' : '$info200'}
          borderRadius='$sm'
          borderWidth='$1'
          flex={1}
          gap='$2'
          key={`${tier.id}-${tierIndex}`}
          onPress={() => {
            onTierSelected(tier)
          }}
          p='$2'
        >
          <Box
            backgroundColor={isSelected ? '$info300' : '$info200'}
            borderRadius='$sm'
            p='$2'
          >
            <Text fontWeight='$bold'>
              {`Tier ${tierIndex + 1} - ${tier.points} point`}
            </Text>
          </Box>
          {unitCompositions[tier.id].map(({ count, model }, compIndex) => (
            <HStack
              alignItems='flex-end'
              key={`${model.id}-${compIndex}`}
              gap='$4'
            >
              <Text p='$1'>{`${count}x ${model.name}`}</Text>
              <HStack
                flex={1}
                gap='$2'
                justifyContent='flex-end'
              >
                {Object.entries(model.stats).map(([key, value]) => (
                  <VStack
                    gap='$1'
                    key={key}
                    p='$1'
                  >
                    <Text>{key}</Text>
                    <Text fontWeight='$bold'>{value}</Text>
                  </VStack>
                ))}
              </HStack>
            </HStack>
          ))}
        </Pressable>
      )
    })}
  </VStack>
)

export default TierSelector
