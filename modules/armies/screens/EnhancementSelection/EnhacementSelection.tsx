import { useUnmount } from 'ahooks'
import {
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  VStack
} from 'appdeptus/components'
import { type NewArmy } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground } from '../../components'
import EnhancementList from './EnhancementList'
import Header from './Header'

const EnhancementSelectionScreen = () => {
  const { reset, watch, getValues } = useFormContext<NewArmy>()

  const selectedCodex = watch('codex.name')
  const selectedDetachment = watch('composition.detachment')

  useUnmount(() => {
    reset({
      ...getValues(),
      composition: {
        detachment: {
          ...selectedDetachment,
          enhancements: []
        }
      }
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
        <ScreenTitle>{selectedCodex}</ScreenTitle>
        <ScreenSubtitle>{selectedDetachment.name}</ScreenSubtitle>
        <EnhancementList />
      </VStack>
    </ScreenContainer>
  )
}

export default EnhancementSelectionScreen
