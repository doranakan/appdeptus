import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground, TopBar } from '../../components'
import DetachmentList from './DetachmentList'

const DetachmentSelectionScreen = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex')

  return (
    <ScreenContainer safeAreaInsets={['bottom']}>
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <TopBar
          subtitle='detachments'
          title={selectedCodex?.name}
        />
        <DetachmentList />
      </VStack>
    </ScreenContainer>
  )
}

export default DetachmentSelectionScreen
