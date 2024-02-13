import { Box, ScrollView } from '@gluestack-ui/themed'
import { Loading, Modal } from 'appdeptus/components'
import { type ArmyUnit } from 'appdeptus/models'
import React from 'react'
import { useGetUnitCompositionQuery } from '../../api'
import UnitStatSheet from '../UnitStatSheet'

type ArmyItemModalProps = {
  unit: ArmyUnit
  onPressClose: () => void
  visible: boolean
}

const ArmyItemModal = ({
  unit,
  onPressClose,
  visible
}: ArmyItemModalProps): JSX.Element => (
  <Modal
    onPressClose={onPressClose}
    visible={visible}
    title={unit.name}
  >
    <ModalContent unit={unit} />
  </Modal>
)

type ModalContentProps = {
  unit: ArmyUnit
}

const ModalContent = ({ unit }: ModalContentProps) => {
  const { data: unitComposition } = useGetUnitCompositionQuery(unit.tier.id)

  if (!unitComposition) {
    return <Loading />
  }

  return (
    <ScrollView
      flex={1}
      gap='$4'
      p='$4'
    >
      <Box
        backgroundColor='$backgroundLight0'
        borderRadius='$md'
        p='$4'
      >
        <UnitStatSheet unitComposition={unitComposition} />
      </Box>
    </ScrollView>
  )
}

export default ArmyItemModal
