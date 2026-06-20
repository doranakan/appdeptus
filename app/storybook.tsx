import { useEffect } from 'react'
import { router } from 'expo-router'

// __DEV__ guard: in production this file is dead code (Metro tree-shakes it
// because the route is only registered inside the __DEV__ block in _layout.tsx)
const StorybookApp = __DEV__ ? require('../.storybook').default : null

const StorybookScreen = () => {
  useEffect(() => {
    if (!__DEV__) router.back()
  }, [])

  if (!StorybookApp) return null

  return <StorybookApp />
}

export default StorybookScreen
