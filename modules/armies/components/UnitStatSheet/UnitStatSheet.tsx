import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { type UnitComposition } from 'appdeptus/models'
import pluralize from 'pluralize'
import React from 'react'
import { STATSHEET_CELL_WIDTH, STATS_CELL_NAMES } from './constants'

type UnitStatSheetProps = {
  unitComposition: UnitComposition
}

const UnitStatSheet = ({
  unitComposition
}: UnitStatSheetProps): JSX.Element => (
  <VStack>
    <HStack flex={1}>
      <Box flex={1} />
      {STATS_CELL_NAMES.map((cellName, index) => (
        <Box
          alignItems='center'
          key={`${cellName}-${index}`}
          width={STATSHEET_CELL_WIDTH}
        >
          <Text fontWeight='$medium'>{cellName}</Text>
        </Box>
      ))}
    </HStack>
    {unitComposition.map(({ count, model }) => (
      <HStack
        key={model.id}
        gap='$2'
        py='$1'
      >
        <Text
          numberOfLines={1}
          lineBreakMode='tail'
        >{`${count}x ${pluralize(model.name, count)}`}</Text>
        <HStack
          flex={1}
          justifyContent='flex-end'
        >
          {Object.values(model.stats).map((stat, index) => (
            <Box
              alignItems='center'
              key={`${stat}-${index}`}
              width={STATSHEET_CELL_WIDTH}
            >
              <Text fontWeight='$bold'>{stat}</Text>
            </Box>
          ))}
        </HStack>
      </HStack>
    ))}
  </VStack>
)

export default UnitStatSheet
