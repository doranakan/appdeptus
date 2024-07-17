import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { type Model } from 'appdeptus/models'
import { STATSHEET_CELL_WIDTH, STATS_CELL_NAMES } from './constants'

type StatSheetProps = {
  model: Model
}

const StatSheet = ({ model }: StatSheetProps): JSX.Element => (
  <VStack gap='$1'>
    <HStack justifyContent='space-evenly'>
      {STATS_CELL_NAMES.map((cellName, index) => (
        <Box
          alignItems='center'
          key={`${cellName}-${index}`}
          width={STATSHEET_CELL_WIDTH}
        >
          <Text
            color='$white'
            fontWeight='$bold'
            size='sm'
          >
            {cellName}
          </Text>
        </Box>
      ))}
    </HStack>

    <HStack justifyContent='space-evenly'>
      {Array.from(Object.values(model.stats)).map((stat, index) => (
        <Box
          alignItems='center'
          bg='$white'
          borderColor='$secondary600'
          borderWidth='$1'
          height={STATSHEET_CELL_WIDTH}
          key={`${stat}-${index}`}
          justifyContent='center'
          width={STATSHEET_CELL_WIDTH}
        >
          <Text
            bold
            size='md'
          >{`${stat}${Object.keys(model.stats)[index] === 'sv' || Object.keys(model.stats)[index] === 'ld' ? '+' : ''}`}</Text>
        </Box>
      ))}
    </HStack>
  </VStack>
)

export default StatSheet
