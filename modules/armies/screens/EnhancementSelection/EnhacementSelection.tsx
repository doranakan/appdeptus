import { useUnmount } from 'ahooks'
import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground, TopBar } from '../../components'
import EnhancementList from './EnhancementList'

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
    <ScreenContainer safeAreaInsets={['bottom']}>
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
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
