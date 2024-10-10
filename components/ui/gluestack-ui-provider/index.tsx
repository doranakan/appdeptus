import { OverlayProvider } from '@gluestack-ui/overlay'
import { ToastProvider } from '@gluestack-ui/toast'
import { selectThemeName } from 'appdeptus/components/store'
import React from 'react'
import { View, type ViewProps } from 'react-native'
import { useSelector } from 'react-redux'
import { config } from './config'

const GluestackUIProvider = (props: {
  children?: React.ReactNode
  style?: ViewProps['style']
}) => {
  const themeName = useSelector(selectThemeName)

  return (
    <View
      style={[
        config[themeName],
        { flex: 1, height: '100%', width: '100%' },
        props.style
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  )
}

export { GluestackUIProvider }
