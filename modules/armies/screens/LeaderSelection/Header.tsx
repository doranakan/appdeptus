import { NavigationHeader } from 'appdeptus/components'
import { ChevronRight } from 'lucide-react-native'
import { memo } from 'react'

const Header = () => (
  <NavigationHeader
    variant='backButton'
    progress={{
      currentStep: 7,
      steps: 10,
      text: 'assign leaders'
    }}
    rightButton={{
      href: 'army-builder/warlord-selection',
      icon: ChevronRight
    }}
  />
)

export default memo(Header)
