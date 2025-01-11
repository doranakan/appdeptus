import {
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  VStack
} from 'appdeptus/components'
import { type CreateGame } from 'appdeptus/models/game'
import { useFormContext } from 'react-hook-form'
import EmbarkedSelectionList from './EmbarkedSelectionList'

const EmbarkedSelection = () => {
  const { watch } = useFormContext<CreateGame>()

  const codex = watch('playerOne.army.codex.name')
  return (
    <ScreenContainer
      className='bg-primary-950 p-4'
      space='md'
    >
      <ScreenTitle>{codex}</ScreenTitle>
      <ScreenSubtitle>Embark your forces</ScreenSubtitle>

      <VStack
        className='flex-1'
        space='md'
      >
        <EmbarkedSelectionList />
      </VStack>
    </ScreenContainer>
  )
}

export default EmbarkedSelection
