import { type ArmyUnit } from 'appdeptus/models'
import ArmyItemModal from './ArmyItemModal'

type ModalContentProps = {
  onPressClose: () => void
  unit: ArmyUnit
  visible: boolean
}

const ModalWrapper = (props: ModalContentProps) => {
  if (!props.visible) {
    return undefined
  }

  return <ArmyItemModal {...props} />
}

export default ModalWrapper
