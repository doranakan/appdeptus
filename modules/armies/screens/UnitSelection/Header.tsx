import { NavigationHeader } from 'appdeptus/components'
import { ChevronRight } from 'lucide-react-native'
import { memo } from 'react'

const Header = () => (
  <NavigationHeader
    variant='backButton'
    progress={{
      currentStep: 6,
      steps: 10,
      text: 'select units'
    }}
    rightButton={{
      href: 'army-builder/leader-selection',
      icon: ChevronRight
    }}
  />
)

export default memo(Header)
