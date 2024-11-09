import { NavigationHeader } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { ChevronRight } from 'lucide-react-native'
import { useWatch } from 'react-hook-form'

const Header = () => {
  const watch = useWatch<ArmyBuilder>()

  const selectedCodex = watch.codex?.name

  return (
    <NavigationHeader
      variant='backButton'
      progress={{
        currentStep: selectedCodex?.length ? 2 : 1,
        steps: 10,
        text: selectedCodex?.length
          ? `selected: ${selectedCodex}`
          : 'select a codex'
      }}
      rightButton={{
        disabled: !selectedCodex?.length,
        icon: ChevronRight,
        href: 'army-builder/detachment-selection',
        variant: 'link'
      }}
    />
  )
}

export default Header
