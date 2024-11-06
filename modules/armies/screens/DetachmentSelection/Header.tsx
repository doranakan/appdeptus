import { NavigationHeader } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { ChevronRight } from 'lucide-react-native'
import { memo } from 'react'
import { useWatch } from 'react-hook-form'

const Header = () => {
  const watch = useWatch<ArmyBuilder>()

  return (
    <NavigationHeader
      variant='backButton'
      progress={{
        currentStep: watch.detachment ? 4 : 3,
        steps: 10,
        text: watch.detachment?.name
          ? `selected: ${watch.detachment?.name}`
          : 'select detachment'
      }}
      rightButton={{
        href: 'army-builder/enhancement-selection',
        disabled: !watch.detachment,
        icon: ChevronRight
      }}
    />
  )
}

export default memo(Header)
