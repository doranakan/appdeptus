import { Box, HStack, Heading, Icon, VStack } from '@gluestack-ui/themed'
import { type Army } from 'appdeptus/models'
import { Dice1, Dice2 } from 'lucide-react-native'

type PlayersContainerProps = {
  armyOne: Omit<Army, 'units'> | undefined
  nameOne: string

  armyTwo?: Omit<Army, 'units'>
  nameTwo?: string
}

const PlayersContainer = ({
  armyOne,
  armyTwo,
  nameOne,
  nameTwo
}: PlayersContainerProps) => (
  <HStack gap='$2'>
    <Player
      army={armyOne}
      name={nameOne}
      player='one'
    />
    <Player
      army={armyTwo}
      name={nameTwo}
      player='two'
    />
  </HStack>
)

type PlayerProps = {
  army: Omit<Army, 'units'> | undefined
  name: string | undefined
}

const Player = ({
  army,
  name,
  player
}: PlayerProps & { player: 'one' | 'two' }) => (
  <VStack flex={1}>
    {army ? (
      <>
        <HStack
          alignItems='center'
          flexDirection={player === 'one' ? 'row' : 'row-reverse'}
          gap='$1'
        >
          <Icon
            as={player === 'one' ? Dice1 : Dice2}
            color='$secondary50'
          />
          <Heading
            color='$secondary50'
            ellipsizeMode='tail'
            numberOfLines={1}
            size='xl'
            textAlign={player === 'one' ? 'left' : 'right'}
          >
            {name}
          </Heading>
        </HStack>
        <Box
          alignItems='center'
          borderColor='$secondary50'
          borderWidth='$1'
          px='$8'
        >
          <Heading
            color='$secondary50'
            letterSpacing='$xl'
            textTransform='uppercase'
          >
            {`${army.totalPoints} pts`}
          </Heading>
        </Box>
        <Heading
          color='$secondary100'
          fontFamily='$mono'
          fontSize='$5xl'
          lineHeight='$6xl'
          textAlign={player === 'one' ? 'left' : 'right'}
          textTransform='capitalize'
        >
          {army.codex.name}
        </Heading>
        <Heading
          color='$secondary50'
          textAlign={player === 'one' ? 'left' : 'right'}
        >
          {army.name}
        </Heading>
      </>
    ) : undefined}
  </VStack>
)

export default PlayersContainer
