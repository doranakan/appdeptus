import { type CodexUnit, type UnitTier } from 'appdeptus/models'
import UnitConfiguratorModal from './UnitConfiguratorModal'

type ModalContentProps = {
  onPressClose: (unitTiers: CodexUnit['tiers']) => void
  selectedTiers: UnitTier[]
  unit: CodexUnit
  visible: boolean
}

const ModalWrapper = (props: ModalContentProps) => {
  if (!props.visible) {
    return undefined
  }

  return <UnitConfiguratorModal {...props} />
}

export default ModalWrapper
