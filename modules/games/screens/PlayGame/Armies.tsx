import {
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { ArmyIcon, Card, SquareContainer } from 'appdeptus/components'
import { type Player } from 'appdeptus/models/game'
import { Link } from 'expo-router'
import { ScanEye } from 'lucide-react-native'
import { memo } from 'react'

type ArmiesProps = {
  armyOne: Player['army']
  armyTwo: Player['army']
}

const Armies = ({ armyOne, armyTwo }: ArmiesProps) => {
  return (
    <Card p='$4'>
      <VStack gap='$4'>
        <Army army={armyOne} />
        <Army
          army={armyTwo}
          reversed
        />
      </VStack>
    </Card>
  )
}

type ArmyProps = {
  army: Player['army']
  reversed?: boolean
}

const Army = ({ army, reversed }: ArmyProps) => (
  <HStack
    alignItems='center'
    h={50}
    reversed={reversed}
  >
    <SquareContainer
      bg={reversed ? '$teal700' : '$primary600'}
      borderColor={reversed ? '$teal700' : '$primary600'}
    >
      <ArmyIcon
        codexName={army.codex.name}
        color='white'
        h={32}
        w={32}
      />
    </SquareContainer>
    <VStack flex={1}>
      <HStack
        alignItems='center'
        borderBottomWidth='$1'
        borderColor={reversed ? '$teal700' : '$primary600'}
        flex={1}
        justifyContent='space-between'
        pl={reversed ? undefined : '$2'}
        pr={reversed ? '$2' : undefined}
        reversed={reversed}
      >
        <Heading lineHeight='$sm'>{army.name}</Heading>
        <Link
          asChild
          href={`play/army/${army.id}`}
        >
          <Pressable>
            <HStack
              alignItems='center'
              flex={1}
              gap='$1'
            >
              <Icon as={ScanEye} />
              <Text underline>Show</Text>
            </HStack>
          </Pressable>
        </Link>
      </HStack>
      <HStack
        alignItems='center'
        flex={1}
        px='$2'
        reversed={reversed}
      >
        <Text>
          <Text bold>{army.codex.name}</Text> - {army.totalPoints}pts
        </Text>
      </HStack>
    </VStack>
  </HStack>
)

export default memo(Armies)