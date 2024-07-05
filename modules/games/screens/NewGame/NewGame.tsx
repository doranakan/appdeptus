import { VStack } from '@gluestack-ui/themed'
import { Modal } from 'appdeptus/components'
import ArmySelector from './ArmySelector'
import Background from './Background'

const NewGameScreen = () => (
  <VStack flex={1}>
    <Background />
    <Modal title='Select army'>
      <VStack
        gap='$4'
        flex={1}
        p='$4'
      >
        <ArmySelector />
      </VStack>
    </Modal>
  </VStack>
)

export default NewGameScreen
