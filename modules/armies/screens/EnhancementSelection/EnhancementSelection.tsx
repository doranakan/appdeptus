import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { useGetDetachmentListQuery } from '../../api'
import { ArmyBuilderBackground, TopBar } from '../../components'
import EnhancementAssignment from './EnhancementAssignment'

const EnhancementSelectionScreen = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex')
  const selectedDetachment = watch('detachment')

  const { enhancements } = useGetDetachmentListQuery(selectedCodex, {
    selectFromResult: ({ data }) => ({
      enhancements: data?.find(({ id }) => id === selectedDetachment.id)
        ?.enhancements
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
          title={selectedCodex.name}
        />
        {enhancements ? (
          <EnhancementAssignment enhancements={enhancements} />
        ) : null}
      </VStack>
    </ScreenContainer>
  )
}

export default EnhancementSelectionScreen
