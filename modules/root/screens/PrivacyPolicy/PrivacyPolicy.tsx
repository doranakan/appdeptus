import { NavigationHeader, ScreenContainer, VStack } from 'appdeptus/components'
import { WebView } from 'react-native-webview'

const PrivacyPolicyScreen = () => (
  <ScreenContainer>
    <VStack className='p-4'>
      <NavigationHeader variant='closeButton' />
    </VStack>
    <WebView
      source={{
        uri: 'https://appdeptus.com/privacy.html'
      }}
      style={{ flex: 1 }}
    />
  </ScreenContainer>
)

export default PrivacyPolicyScreen
