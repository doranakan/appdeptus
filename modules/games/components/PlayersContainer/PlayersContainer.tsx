import { Box } from 'appdeptus/components/ui/box'
import { Heading } from 'appdeptus/components/ui/heading'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type Army } from 'appdeptus/models'
import { Shield, Swords } from 'lucide-react-native'

type PlayersContainerProps = {
  armyOne: Omit<Army, 'units' | 'detachment'> | undefined
  nameOne: string

  armyTwo?: Omit<Army, 'units' | 'detachment'>
  nameTwo?: string
}

const PlayersContainer = ({
  armyOne,
  armyTwo,
  nameOne,
  nameTwo
}: PlayersContainerProps) => (
  <HStack className='gap-2'>
    <Player
      army={armyOne}
      name={nameOne}
      role='attacker'
    />
    <Player
      army={armyTwo}
      name={nameTwo}
      role='defender'
    />
  </HStack>
)

type PlayerProps = {
  army: Omit<Army, 'units' | 'detachment'> | undefined
  name: string | undefined
}

const Player = ({
  army,
  name,
  role
}: PlayerProps & { role: 'attacker' | 'defender' }) => (
  <VStack className='flex-1'>
    {army ? (
      <>
        <HStack
          className={` ${role === 'attacker' ? 'flex-row' : 'flex-reverse'} items-center gap-1 `}
        >
          <Icon
            as={role === 'attacker' ? Swords : Shield}
            className='text-secondary-50'
          />
          <Text
            bold
            ellipsizeMode='tail'
            numberOfLines={1}
            size='xl'
            className={` ${role === 'attacker' ? 'text-left' : 'text-right'} text-secondary-50 `}
          >
            {name}
          </Text>
        </HStack>
        <Box
          className={` ${role === 'attacker' ? 'bg-primary-600' : 'bg-teal-700'} items-center border-secondary-50 rounded-lg border-1 `}
        >
          <Text
            bold
            textTransform='uppercase'
            className='text-secondary-50 tracking-xl'
          >
            {`${army.totalPoints} pts`}
          </Text>
        </Box>
        <Heading
          adjustsFontSizeToFit
          numberOfLines={1}
          className={` ${role === 'attacker' ? 'text-left' : 'text-right'} text-secondary-100 text-3xl leading-3xl `}
        >
          {army.codex.name}
        </Heading>
        <Text
          bold
          className={` ${role === 'attacker' ? 'text-left' : 'text-right'} text-secondary-50 `}
        >
          {army.name}
        </Text>
      </>
    ) : undefined}
  </VStack>
)

export default PlayersContainer
