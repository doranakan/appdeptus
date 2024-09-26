import { Text, View } from 'react-native'

const RootScreen = () => (
  <View
    style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    }}
  >
    <Text
      style={{
        fontFamily: 'Silkscreen_400Regular'
      }}
    >
      Appdeptus
    </Text>
    <Text
      style={{
        fontFamily: 'IBMPlexMono_400Regular'
      }}
    >
      Munitorum at work
    </Text>
  </View>
)

export default RootScreen
