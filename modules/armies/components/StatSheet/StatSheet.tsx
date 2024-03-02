import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { type Model } from 'appdeptus/models'
import { STATSHEET_CELL_WIDTH, STATS_CELL_NAMES } from './constants'

type StatSheetProps = {
  model: Model
}

const StatSheet = ({ model }: StatSheetProps): JSX.Element => (
  <VStack
    backgroundColor='$backgroundLight100'
    borderRadius='$md'
    px='$4'
    py='$2'
  >
    <HStack justifyContent='space-between'>
      {STATS_CELL_NAMES.map((cellName, index) => (
        <Box
          alignItems='center'
          key={`${cellName}-${index}`}
          width={STATSHEET_CELL_WIDTH}
        >
          <Text
            fontWeight='$bold'
            size='sm'
          >
            {cellName}
          </Text>
        </Box>
      ))}
    </HStack>

    <HStack justifyContent='space-between'>
      {Array.from(Object.values(model.stats)).map((stat, index) => (
        <Box
          alignItems='center'
          key={`${stat}-${index}`}
          width={STATSHEET_CELL_WIDTH}
        >
          <Text size='sm'>{stat}</Text>
        </Box>
      ))}
    </HStack>
  </VStack>
)

export default StatSheet
