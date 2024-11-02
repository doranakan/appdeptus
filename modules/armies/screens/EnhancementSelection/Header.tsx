import { NavigationHeader } from 'appdeptus/components'
import { ChevronRight } from 'lucide-react-native'
import { memo } from 'react'

const Header = () => (
  <NavigationHeader
    variant='backButton'
    progress={{
      currentStep: 5,
      steps: 10,
      text: 'select enhancements'
    }}
    rightButton={{
      href: 'army-builder/unit-selection',
      icon: ChevronRight
    }}
  />
)

export default memo(Header)
