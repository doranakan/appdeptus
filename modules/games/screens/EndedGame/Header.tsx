import { Header } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
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

    <HStack className='justify-center'>
      <Box className='border-secondary-50 border-1 px-2'>
        <Text
          bold
          size='sm'
          className='text-secondary-50'
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
