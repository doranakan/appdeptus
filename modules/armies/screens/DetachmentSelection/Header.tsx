import { NavigationHeader } from 'appdeptus/components'
import { type NewArmy } from 'appdeptus/models'
import { ChevronRight } from 'lucide-react-native'
import { memo } from 'react'
import { useWatch } from 'react-hook-form'

const Header = () => {
  const watch = useWatch<NewArmy>()

  return (
    <NavigationHeader
      variant='backButton'
      progress={{
        currentStep: watch.composition?.detachment ? 4 : 3,
        steps: 10,
        text: watch.composition?.detachment?.name
          ? `selected: ${watch.composition?.detachment?.name}`
          : 'select detachment'
      }}
      rightButton={{
        href: 'army-builder/enhancement-selection',
        disabled: !watch.composition?.detachment,
        icon: ChevronRight
      }}
    />
  )
}

export default memo(Header)
