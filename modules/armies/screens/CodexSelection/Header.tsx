import { NavigationHeader } from 'appdeptus/components'
import { type NewArmy } from 'appdeptus/models'
import { ChevronRight } from 'lucide-react-native'
import { useWatch } from 'react-hook-form'

const Header = () => {
  const watch = useWatch<NewArmy>()

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
        icon: ChevronRight,
        href: 'army-builder/detachment-selection',
        disabled: !selectedCodex?.length
      }}
    />
  )
}

export default Header
