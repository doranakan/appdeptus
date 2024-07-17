import {
  Box,
  Heading,
  KeyboardAvoidingView,
  Text,
  VStack
} from '@gluestack-ui/themed'
import {
  AnimatedBackgroundImage,
  BackgroundImage,
  Card,
  LinearGradient
} from 'appdeptus/components'
import { config } from 'appdeptus/designSystem'
import { StatusBar } from 'expo-status-bar'
import { MotiView } from 'moti'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Form from './Form'

const RootScreen = () => {
  const insets = useSafeAreaInsets()
  return (
    <>
      <StatusBar style='light' />
      <VStack
        bg='$secondary800'
        flex={1}
      >
        <Background />

        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={-insets.bottom}
          flex={1}
        >
          <Splash />

          <Content />
        </KeyboardAvoidingView>
      </VStack>
    </>
  )
}

const Background = () => (
  <>
    <VStack
      h='$full'
      position='absolute'
      width='$full'
    >
      <AnimatedBackgroundImage
        source='sign_in'
        delay={2000}
        duration={2000}
        fromScale={1.1}
        opacity={0.3}
      />
      <VStack
        h='$full'
        position='absolute'
        w='$full'
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 500, duration: 2000 }}
        >
          <LinearGradient
            colors={[
              config.tokens.colors.secondary900,
              'rgba(0,0,0,0.2)',
              config.tokens.colors.secondary700
            ]}
          />
        </MotiView>
      </VStack>
    </VStack>

    <MotiView
      from={{
        opacity: 1
      }}
      animate={{
        opacity: 0
      }}
      transition={{
        duration: 1000,
        type: 'timing'
      }}
      style={{
        backgroundColor: config.tokens.colors.secondary800,
        height: '100%',
        position: 'absolute',
        width: '100%'
      }}
    />
  </>
)

const Splash = () => {
  const window = useWindowDimensions()

  return (
    <>
      <MotiView
        from={{
          top: 0
        }}
        animate={{
          top: -window.height / 4
        }}
        transition={{
          delay: 1000,
          duration: 1000,
          type: 'timing'
        }}
        style={{
          height: '100%',
          position: 'absolute',
          width: '100%'
        }}
      >
        <BackgroundImage source='splash' />
      </MotiView>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 500, duration: 2000, type: 'timing' }}
        style={{
          height: '20%',
          position: 'absolute',
          width: '100%'
        }}
      >
        <LinearGradient
          colors={[
            config.tokens.colors.secondary900,
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)'
          ]}
        />
      </MotiView>
    </>
  )
}

const Content = () => {
  const insets = useSafeAreaInsets()

  return (
    <MotiView
      from={{ opacity: 0, paddingBottom: 0 }}
      animate={{ opacity: 1, paddingBottom: insets.bottom }}
      transition={{ delay: 2500, duration: 2000, type: 'timing' }}
      style={{ flex: 1 }}
    >
      <VStack flex={1}>
        <Box flex={4} />
        <VStack
          alignItems='center'
          flex={2}
          justifyContent='center'
        >
          <Heading
            color='$secondary200'
            fontSize='$4xl'
            lineHeight='$4xl'
          >
            Appdeptus
          </Heading>
          <Text
            color='$secondary100'
            textAlign='center'
          >
            {'An unofficial Warhammer 40.000™\ncompanion app'}
          </Text>
        </VStack>
      </VStack>
      <VStack
        flex={1}
        justifyContent='flex-end'
        p='$4'
      >
        <Card opacity={0.8}>
          <Text bold>Sign in</Text>
          <Form />
        </Card>
      </VStack>
    </MotiView>
  )
}

export default RootScreen
