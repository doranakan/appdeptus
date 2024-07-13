import { Heading, HStack, Icon, Pressable } from '@gluestack-ui/themed'
import { type ActiveGame } from 'appdeptus/models/game'
import { Link } from 'expo-router'
import { ChevronLeft, HelpCircle } from 'lucide-react-native'

type HeaderProps = {
  status: ActiveGame['status']
}

const Header = ({ status }: HeaderProps) => (
  <HStack alignItems='center'>
    <Link
      asChild
      href='../'
    >
      <Pressable>
        <Icon
          as={ChevronLeft}
          size='xl'
        />
      </Pressable>
    </Link>
    <Heading
      fontFamily='$mono'
      flex={1}
      size='4xl'
      textAlign='center'
      textTransform='capitalize'
    >
      {mapStatusToText[status]}
    </Heading>

    <Pressable>
      <Icon
        as={HelpCircle}
        size='xl'
      />
    </Pressable>
  </HStack>
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

export default Header
