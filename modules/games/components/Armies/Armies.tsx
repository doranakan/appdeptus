import { ArmyIcon, SquareContainer } from 'appdeptus/components'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
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
    <VStack className='bg-backgroundLight-100 rounded-2xl p-4'>
      <VStack className='gap-4'>
        <Army army={armyOne} />
        <Army
          army={armyTwo}
          reversed
        />
      </VStack>
    </VStack>
  )
}

type ArmyProps = {
  army: Player['army']
  reversed?: boolean
}

const Army = ({ army, reversed }: ArmyProps) => (
  <HStack
    reversed={reversed}
    className='items-center h-[50px]'
  >
    <SquareContainer>
      <ArmyIcon
        codexName={army.codex.name}
        color='white'
        h={32}
        w={32}
      />
    </SquareContainer>
    <VStack className='flex-1'>
      <HStack
        reversed={reversed}
        className={` ${reversed ? 'pr-2' : undefined} ${reversed ? undefined : 'pl-2'} ${reversed ? 'border-teal-700' : 'border-primary-600'} items-center border-b-1 flex-1 justify-between `}
      >
        <Text
          bold
          className='leading-sm'
        >
          {army.name}
        </Text>
        <Link
          asChild
          href={`play/army/${army.id}`}
        >
          <Pressable>
            <HStack className='items-center flex-1 gap-1'>
              <Icon as={ScanEye} />
              <Text underline>Show</Text>
            </HStack>
          </Pressable>
        </Link>
      </HStack>
      <HStack
        reversed={reversed}
        className='items-center flex-1 px-2'
      >
        <Text>
          <Text bold>{army.codex.name}</Text> - {army.totalPoints}pts
        </Text>
      </HStack>
    </VStack>
  </HStack>
)

export default memo(Armies)
