import { NavigationHeader, ScreenContainer, VStack } from 'appdeptus/components'
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview'

const TermsAndConditionsScreen = () => (
  <ScreenContainer
    safeAreaInsets={Platform.OS === 'android' ? ['top'] : undefined}
  >
    <VStack className='p-4'>
      <NavigationHeader variant='closeButton' />
    </VStack>
    <WebView
      source={{
        uri: 'https://appdeptus.com/terms-and-conditions.html'
      }}
      style={{ flex: 1 }}
    />
  </ScreenContainer>
)

export default TermsAndConditionsScreen
