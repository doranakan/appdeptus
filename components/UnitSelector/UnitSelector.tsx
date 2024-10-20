import { type Unit } from 'appdeptus/models'
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Card from '../Card'
import Text from '../Text'
import { HStack, VStack } from '../ui'

type UnitSelectorProps = {
  count: number
  onAdd: (id: Unit['id']) => void
  onEdit: (id: Unit['id']) => void
  unit: Unit
}

const UnitSelector = ({ count, onAdd, onEdit, unit }: UnitSelectorProps) => (
  <Card variant={count ? 'selected' : 'default'}>
    <VStack
      className='p-4'
      space='sm'
    >
      <HStack className='items-center justify-between'>
        <Text>{unit.name}</Text>
        <Text
          className='uppercase'
          family='body-bold'
        >
          {count ? unit.tiers[0].points * count : unit.tiers[0].points}pts
        </Text>
      </HStack>
      <HStack className='items-end justify-between'>
        <Text>{count} Selected</Text>
        <ButtonGroup>
          {count ? (
            <Button
              size='sm'
              variant='callback'
              onPress={() => {
                onEdit(unit.id)
              }}
              text='edit'
              color='primary'
            />
          ) : null}
          <Button
            size='sm'
            variant='callback'
            onPress={() => {
              onAdd(unit.id)
            }}
            text='add'
            color='primary'
          />
        </ButtonGroup>
      </HStack>
    </VStack>
  </Card>
)

export default UnitSelector
