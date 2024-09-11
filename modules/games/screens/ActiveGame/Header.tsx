import { Header } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
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
        disabled: true,
        href: '',
        Icon: HelpCircle
      }}
      title={mapStatusToText[status]}
    />

    <HStack className='justify-center'>
      <Box className='border-secondary-50 rounded-lg border-1 px-2'>
        <Text
          bold
          size='sm'
          className='text-secondary-50'
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
