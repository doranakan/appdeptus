import {
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  VStack
} from 'appdeptus/components'
import { type CreateGame } from 'appdeptus/models/game'
import { useWatch } from 'react-hook-form'
import AttachedUnitSelectionList from './AttachedUnitSelectionList'

const AttachedUnitSelectionScreen = () => {
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
      <ScreenSubtitle>form attached units</ScreenSubtitle>

      <VStack
        className='flex-1'
        space='md'
      >
        <AttachedUnitSelectionList />
      </VStack>
    </ScreenContainer>
  )
}

export default AttachedUnitSelectionScreen
