import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetDetachmentListQuery } from '../../api'
import { ArmyBuilderBackground, TopBar } from '../../components'
import EnhancementAssignment from './EnhancementAssignment'

const EnhancementSelectionScreen = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex')

  const { data } = useGetDetachmentListQuery(selectedCodex)

  const selectedDetachments = watch('detachments')

  const enhancements = useMemo(
    () =>
      data
        ?.filter((d) => selectedDetachments.some(({ id }) => id === d.id))
        .flatMap((d) => d.enhancements) ?? [],
    [data, selectedDetachments]
  )

  return (
    <ScreenContainer safeAreaInsets={['bottom']}>
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <TopBar
          subtitle=''
          title={selectedCodex.name}
          step='units'
        />
        {enhancements.length > 0 ? (
          <EnhancementAssignment enhancements={enhancements} />
        ) : null}
      </VStack>
    </ScreenContainer>
  )
}

export default EnhancementSelectionScreen
