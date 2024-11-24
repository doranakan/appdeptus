import {
  ArmyRoster,
  ScreenContainer,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { useFormContext } from 'react-hook-form'

const DoubleCheckScreen = () => {
  const { watch } = useFormContext<NewGame>()

  const codex = watch('playerOne.army.codex.name')

  const roster = watch('playerOne.army.roster')

  return (
    <ScreenContainer
      className='bg-primary-950 p-4'
      space='md'
    >
      <ScreenTitle>{codex}</ScreenTitle>
      <Text
        family='body-regular-italic'
        size='sm'
      >
        Your forces are assembled and your army stands ready, warrior! Tap the
        QR Seal of the Omnissiah in the top right. This sacred glyph shall
        encode your war protocols. Let your opponent scan it, and the rites of
        battle shall commence.
      </Text>

      <VStack
        className='flex-1'
        space='md'
      >
        <ArmyRoster roster={roster} />
      </VStack>
    </ScreenContainer>
  )
}

export default DoubleCheckScreen
