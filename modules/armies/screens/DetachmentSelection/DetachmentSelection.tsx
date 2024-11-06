import { useUnmount } from 'ahooks'
import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground, TopBar } from '../../components'
import DetachmentList from './DetachmentList'
import Header from './Header'

const DetachmentSelectionScreen = () => {
  const { watch, reset } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex')

  useUnmount(() => {
    reset({
      codex: selectedCodex
    })
  })

  return (
    <ScreenContainer safeAreaInsets={['bottom', 'top']}>
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <Header />
        <TopBar
          subtitle='detachmentSelection'
          title={selectedCodex.name}
        />
        <DetachmentList />
      </VStack>
    </ScreenContainer>
  )
}

export default DetachmentSelectionScreen
