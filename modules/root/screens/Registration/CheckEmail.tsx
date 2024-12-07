import { useCountDown } from 'ahooks'
import mailAnimated from 'appdeptus/assets/lotties/mail-animated.json'
import {
  NavigationHeader,
  ScreenContainer,
  Text,
  VStack
} from 'appdeptus/components'
import LottieView from 'lottie-react-native'
import { Repeat } from 'lucide-react-native'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Platform } from 'react-native'
import { useSignUpMutation } from '../../api'
import { type Registration } from './schema'

const CheckEmail = () => {
  const { handleSubmit, watch } = useFormContext<Registration>()

  const email = watch('email')

  const [signUp, { isLoading }] = useSignUpMutation()

  const [leftTime, setLeftTime] = useState<number>(60000)

  const [countdown, { seconds }] = useCountDown({
    leftTime
  })

  return (
    <ScreenContainer
      safeAreaInsets={
        Platform.OS === 'android' ? ['top', 'bottom'] : ['bottom']
      }
      className='p-4'
      space='md'
    >
      <NavigationHeader
        variant='closeButton'
        rightButton={{
          disabled: !!countdown,
          onPress: () => {
            handleSubmit(signUp)
            setLeftTime(60000)
          },
          loading: isLoading,
          variant: 'callback',
          icon: Repeat,
          text: seconds ? String(seconds) : undefined
        }}
      />
      <VStack
        className='flex-1 items-center justify-center'
        space='md'
      >
        <LottieView
          autoPlay
          style={{
            width: 100,
            height: 100
          }}
          source={mailAnimated}
        />
        <Text
          family='heading-regular'
          size='2xl'
        >
          check your mailbox
        </Text>
        <Text>{email}</Text>
        <Text className='text-center'>
          Open your mail app! You have received a confirmation mail to activate
          your account and start using Appdeptus.
        </Text>
        <Text
          className='text-center'
          family='body-regular-italic'
          size='sm'
        >
          If you did not receive it you cannot retry by pressing the red button
          on the top right corner of this screen.
        </Text>
      </VStack>
    </ScreenContainer>
  )
}

export default CheckEmail
