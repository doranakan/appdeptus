import {
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  VStack
} from 'appdeptus/components'
import { type CreateGame } from 'appdeptus/models/game'
import { useWatch } from 'react-hook-form'
import LeaderSelectionList from './LeaderSelectionList'

const LeaderSelectionScreen = () => {
  const watch = useWatch<CreateGame>()

  const codex = watch.playerOne?.army?.codex?.name

  if (!codex) {
    return null
  }

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
