import { Box, HStack, Heading, VStack } from '@gluestack-ui/themed'
import { type Army } from 'appdeptus/models'

type PlayersContainerProps = {
  armyOne: Omit<Army, 'units'> | undefined
  armyTwo?: Omit<Army, 'units'>
}

const PlayersContainer = ({ armyOne, armyTwo }: PlayersContainerProps) => (
  <HStack gap='$2'>
    <Player
      army={armyOne}
      player='one'
    />
    <Player
      army={armyTwo}
      player='two'
    />
  </HStack>
)

type PlayerProps = {
  army: Omit<Army, 'units'> | undefined
}

const Player = ({ army, player }: PlayerProps & { player: 'one' | 'two' }) => (
  <VStack flex={1}>
    {army ? (
      <>
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
