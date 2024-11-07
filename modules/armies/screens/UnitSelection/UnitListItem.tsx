import {
  Button,
  ButtonGroup,
  Card,
  HStack,
  Text,
  UnitName,
  VStack
} from 'appdeptus/components'
import { type SelectableUnit, type Unit } from 'appdeptus/models'
import { memo, useMemo } from 'react'

type UnitListItemProps = {
  onPressAdd: (unit: SelectableUnit) => void
  onPressEdit: (unit: SelectableUnit) => void
  selectedUnits: Unit[] | undefined
  unit: SelectableUnit
}

const UnitListItem = ({
  onPressAdd,
  onPressEdit,
  selectedUnits,
  unit
}: UnitListItemProps) => {
  const count = selectedUnits?.length ?? 0

  const points = useMemo(() => {
    if (!count) {
      return unit.tiers[0].points
    }

    return selectedUnits?.reduce((acc, unit) => (acc += unit.tier.points), 0)
  }, [count, selectedUnits, unit.tiers])

  return (
    <Card variant={count ? 'selected' : 'selectable'}>
      <VStack
        className='p-4'
        space='md'
      >
        <HStack
          className='items-center justify-between'
          space='md'
        >
          <UnitName {...unit} />
          <Text
            className='uppercase'
            family='body-bold'
            size='lg'
          >{`${points}pts`}</Text>
        </HStack>
        <HStack
          className='items-center justify-between'
          space='md'
        >
          <Text>{`${count} Selected`}</Text>
          <ButtonGroup>
            {count > 0 ? (
              <Button
                onPress={() => {
                  onPressEdit(unit)
                }}
                size='sm'
                text='edit'
                variant='callback'
              />
            ) : null}
            <Button
              onPress={() => {
                onPressAdd(unit)
              }}
              size='sm'
              text='add'
              variant='callback'
            />
          </ButtonGroup>
        </HStack>
      </VStack>
    </Card>
  )
}

export default memo(UnitListItem)
