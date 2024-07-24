import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Header } from 'appdeptus/components'
import { formatDistance } from 'date-fns'
import { ChevronLeft, Share } from 'lucide-react-native'

type EndedGameHeaderProps = {
  lastUpdate: string
}

const EndedGameHeader = ({ lastUpdate }: EndedGameHeaderProps) => (
  <VStack>
    <Header
      left={{
        href: '../',
        Icon: ChevronLeft
      }}
      right={{
        disabled: true,
        href: '',
        Icon: Share
      }}
      title='Ended'
    />

    <HStack justifyContent='center'>
      <Box
        borderColor='$secondary50'
        borderWidth='$1'
        px='$2'
      >
        <Text
          bold
          color='$secondary50'
          size='sm'
        >
          {formatDistance(new Date(lastUpdate), new Date(), {
            addSuffix: true
          })}
        </Text>
      </Box>
    </HStack>
  </VStack>
)

export default EndedGameHeader
