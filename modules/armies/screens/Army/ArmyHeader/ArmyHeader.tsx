import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import { ArmyIcon, Card } from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { Share2 } from 'lucide-react-native'
import ActionButton from './ActionButton'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'

type ArmyHeaderProps = {
  army: Army
}

const ArmyHeader = ({ army }: ArmyHeaderProps) => (
  <VStack mb='$4'>
    <Card gap='$4'>
      <VStack alignItems='center'>
        <ArmyIcon
          codexName={army.codex.name}
          color='primary500'
          h={80}
          w={80}
        />
        <Heading
          size='2xl'
          textAlign='center'
        >
          {army.name}
        </Heading>
        <Text textAlign='center'>
          <Text fontWeight='bold'>{army.totalPoints} </Text>
          points
        </Text>
      </VStack>
      <HStack gap='$2'>
        <EditButton
          armyId={army.id}
          codexId={army.codex.id}
        />
        <DeleteButton armyId={army.id} />
        <ActionButton
          Icon={Share2}
          onPress={() => {}}
          title='Share'
        />
      </HStack>
    </Card>
  </VStack>
)

export default ArmyHeader
