import { ScreenContainer, Text, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useFormContext } from 'react-hook-form'
import { ArmyBuilderBackground, TopBar } from '../../components'
import NameInput from './NameInput'
import WarlordList from './WarlordList'

const WarlordSelectionScreen = () => {
  const { watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex.name')

  return (
    <ScreenContainer safeAreaInsets={['bottom']}>
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <TopBar
          subtitle='Your army'
          title={selectedCodex}
          step='units'
        />

        <NameInput />

        <Text
          className='uppercase text-primary-200'
          family='body-bold'
        >
          select warlord
        </Text>

        <WarlordList />
      </VStack>
    </ScreenContainer>
  )
}

export default WarlordSelectionScreen
