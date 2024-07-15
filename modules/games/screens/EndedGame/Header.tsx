import { Box, Heading, HStack, VStack } from '@gluestack-ui/themed'
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
        <Heading
          color='$secondary50'
          size='sm'
        >
          {formatDistance(new Date(lastUpdate), new Date(), {
            addSuffix: true
          })}
        </Heading>
      </Box>
    </HStack>
  </VStack>
)

export default EndedGameHeader
