import {
  Button,
  ButtonGroup,
  Card,
  HStack,
  Text,
  UnitName,
  VStack
} from 'appdeptus/components'
import { getCostForPick, isHero, type SelectableUnit, type Unit } from 'appdeptus/models'
import { memo, useMemo } from 'react'

type UnitListItemProps = {
  maxCount: number
  onPressAdd: (unit: SelectableUnit) => void
  onPressEdit: (unit: SelectableUnit) => void
  selectedUnits: Unit[] | undefined
  unit: SelectableUnit
}

const UnitListItem = ({
  maxCount,
  onPressAdd,
  onPressEdit,
  selectedUnits,
  unit
}: UnitListItemProps) => {
  const count = selectedUnits?.length ?? 0

  const points = useMemo(() => {
    if (!count) {
      return getCostForPick(unit.tiers[0], 1)
    }

    return selectedUnits?.reduce(
      (acc, unit) =>
        (acc +=
          unit.tier.points +
          unit.upgrades.reduce((sum, upg) => (sum += upg.points), 0) +
          ('enhancement' in unit ? (unit.enhancement?.points ?? 0) : 0)),
      0
    )
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
              disabled={(isHero(unit) && count > 0) || count >= maxCount}
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
