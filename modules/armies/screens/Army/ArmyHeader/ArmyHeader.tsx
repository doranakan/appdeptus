import { Badge, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Card, CodexLogo } from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import ActionButton from './ActionButton'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'

type ArmyHeaderProps = {
  army: Army
}

const ArmyHeader = ({ army }: ArmyHeaderProps) => (
  <Card
    gap='$4'
    mb='$4'
  >
    <VStack alignItems='center'>
      <CodexLogo
        codexId={army.codex.id}
        height={80}
        width={80}
      />
      <Badge
        backgroundColor='$primary50'
        borderColor='$primary200'
        variant='outline'
      >
        <Text size='sm'>{`Codex ${army.codex.name}`}</Text>
      </Badge>
      <Text
        fontWeight='bold'
        size='2xl'
        textAlign='center'
      >
        {army.name}
      </Text>
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
        iconName='share-alt'
        onPress={() => {}}
        title='Share'
      />
    </HStack>
  </Card>
)

export default ArmyHeader
