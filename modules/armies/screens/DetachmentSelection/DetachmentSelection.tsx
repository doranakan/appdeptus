import { useUnmount } from 'ahooks'
import {
  ScreenContainer,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { type NewArmy } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground } from '../../components'
import DetachmentList from './DetachmentList'
import Header from './Header'

const DetachmentSelectionScreen = () => {
  const { watch, reset } = useFormContext<NewArmy>()

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
        <ScreenTitle>{selectedCodex.name}</ScreenTitle>
        <Text
          className='uppercase text-primary-200'
          family='body-bold'
          size='lg'
        >
          detachments
        </Text>
        <DetachmentList />
      </VStack>
    </ScreenContainer>
  )
}

export default DetachmentSelectionScreen
