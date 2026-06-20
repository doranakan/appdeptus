import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground, TopBar } from '../../components'
import EnhancementAssignment from './EnhancementAssignment'

const EnhancementSelectionScreen = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex')

  const detachments = watch('detachments')

  const enhancements = useMemo(
    () => detachments?.flatMap((d) => d.enhancements) ?? [],
    [detachments]
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
