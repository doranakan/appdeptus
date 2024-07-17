import { Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Header } from 'appdeptus/components'
import { type ActiveGame } from 'appdeptus/models/game'
import { ChevronLeft, HelpCircle } from 'lucide-react-native'

type PlayGameHeaderProps = {
  status: ActiveGame['status']
}

const PlayGameHeader = ({ status }: PlayGameHeaderProps) => (
  <VStack>
    <Header
      left={{
        href: '../',
        Icon: ChevronLeft
      }}
      right={{
        href: '',
        Icon: HelpCircle
      }}
      title={mapStatusToText[status]}
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
          {status.endsWith('1') ? 'Attacker' : 'Defender'}
        </Text>
      </Box>
    </HStack>
  </VStack>
)

const mapStatusToText: Record<ActiveGame['status'], string> = {
  turn1_p1: 'Turn 1',
  turn1_p2: 'Turn 1',
  turn2_p1: 'Turn 2',
  turn2_p2: 'Turn 2',
  turn3_p1: 'Turn 3',
  turn3_p2: 'Turn 3',
  turn4_p1: 'Turn 4',
  turn4_p2: 'Turn 4',
  turn5_p1: 'Turn 5',
  turn5_p2: 'Turn 5'
} as const

export default PlayGameHeader
