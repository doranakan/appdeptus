import { HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { Card } from 'appdeptus/components'
import { type ArmyUnit } from 'appdeptus/models'
import { Link } from 'expo-router'
import pluralize from 'pluralize'

type ArmyItemProps = {
  armyId: string
  unit: ArmyUnit
}

const ArmyItem = ({ armyId, unit }: ArmyItemProps): JSX.Element => (
  <Link
    href={{
      params: {
        tierId: unit.tier.id,
        unitId: unit.id
      },
      pathname: `./${armyId}`
    }}
    asChild
  >
    <Pressable>
      <Card
        animated
        justifyContent='space-between'
      >
        <HStack
          alignItems='center'
          justifyContent='space-between'
        >
          <VStack>
            <Text>
              <Heading>{unit.name}</Heading>
            </Text>
            {unit.caption && <Text size='xs'>{unit.caption}</Text>}
          </VStack>
          <Text fontWeight='bold'>
            {unit.tier.points} <Text>points</Text>
          </Text>
        </HStack>
        <Text
          size='xs'
          fontWeight='bold'
        >
          {`${unit.tier.models} ${pluralize('model', unit.tier.models)}`}
        </Text>
      </Card>
    </Pressable>
  </Link>
)

export default ArmyItem
