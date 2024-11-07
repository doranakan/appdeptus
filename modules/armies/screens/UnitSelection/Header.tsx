import { NavigationHeader } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { ChevronRight } from 'lucide-react-native'
import { memo, useMemo } from 'react'
import { useWatch } from 'react-hook-form'

const Header = () => {
  const watch = useWatch<ArmyBuilder>()

  const shouldAssignLeaders = useMemo(
    () =>
      !!watch.units?.filter(({ type }) => type === 'leader').length &&
      !!watch.units?.filter(({ type }) => type === 'squad').length,
    [watch.units]
  )

  return (
    <NavigationHeader
      variant='backButton'
      progress={{
        currentStep: 6,
        steps: 10,
        text: 'select units'
      }}
      rightButton={{
        href: shouldAssignLeaders
          ? 'army-builder/leader-selection'
          : 'army-builder/warlord-selection',
        icon: ChevronRight
      }}
    />
  )
}

export default memo(Header)
