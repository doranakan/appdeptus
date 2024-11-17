import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground, TopBar } from '../../components'
import LeaderSelectionList from './LeaderSelectionList'

const LeaderSelectionScreen = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex.name')
  const selectedDetachment = watch('detachment')

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

        <LeaderSelectionList />
      </VStack>
    </ScreenContainer>
  )
}

export default LeaderSelectionScreen
