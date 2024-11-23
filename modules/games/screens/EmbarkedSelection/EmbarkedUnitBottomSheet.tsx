import { BottomSheet, Button, Card, Text, VStack } from 'appdeptus/components'
import {
  type Embarked,
  type Team,
  type Transport,
  type Unit
} from 'appdeptus/models'
import { memo } from 'react'
import ref from './ref'

type EmbarkedUnitsBottomSheetProps = {
  selectedTransport: Embarked | Transport
  onPressUnit: (unit: Unit | Team) => void
}

const EmbarkedUnitsBottomSheet = ({
  onPressUnit,
  selectedTransport
}: EmbarkedUnitsBottomSheetProps) => {
  if (selectedTransport.type === 'transport') {
    return null
  }

  return (
    <BottomSheet
      onPressBackdrop={() => ref.current?.dismiss()}
      ref={ref}
    >
      <VStack space='md'>
        <Text
          className='text-center'
          family='body-bold'
        >
          {selectedTransport.transport.name}
        </Text>
        {selectedTransport.crew?.map((unit) => (
          <Card key={unit.type === 'team' ? unit.id : unit.selectionId}>
            <VStack
              className='p-4'
              space='sm'
            >
              <Text
                className='uppercase'
                family='body-bold'
                size='sm'
              >
                {unit.type === 'team' ? 'team' : 'unit'}
              </Text>
              {unit.type === 'team' ? (
                <Text>{`${unit.leader.name} & ${unit.bodyguard.name}`}</Text>
              ) : (
                <Text>{unit.name}</Text>
              )}

              <Button
                color='secondary'
                onPress={() => {
                  onPressUnit(unit)
                }}
                size='sm'
                text='disembark'
                variant='callback'
              />
            </VStack>
          </Card>
        ))}
      </VStack>
    </BottomSheet>
  )
}

export default memo(EmbarkedUnitsBottomSheet)
