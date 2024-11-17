import { useUnmount } from 'ahooks'
import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground, TopBar } from '../../components'
import EnhancementList from './EnhancementList'
import Header from './Header'

const EnhancementSelectionScreen = () => {
  const { reset, watch, getValues } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex.name')
  const selectedDetachment = watch('detachment')

  useUnmount(() => {
    reset({
      ...getValues(),

      detachment: {
        ...selectedDetachment
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
        <TopBar
          subtitle={selectedDetachment.name}
          title={selectedCodex}
        />
        <EnhancementList />
      </VStack>
    </ScreenContainer>
  )
}

export default EnhancementSelectionScreen
