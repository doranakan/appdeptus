import {
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { useFormContext } from 'react-hook-form'
import LeaderSelectionList from './LeaderSelectionList'

const LeaderSelectionScreen = () => {
  const { watch } = useFormContext<NewGame>()

  const codex = watch('playerOne.army.codex.name')

  return (
    <ScreenContainer
      className='bg-primary-950 p-4'
      space='md'
    >
      <ScreenTitle>{codex}</ScreenTitle>
      <ScreenSubtitle>choose your leaders</ScreenSubtitle>

      <VStack
        className='flex-1'
        space='md'
      >
        <LeaderSelectionList />
      </VStack>
    </ScreenContainer>
  )
}

export default LeaderSelectionScreen
