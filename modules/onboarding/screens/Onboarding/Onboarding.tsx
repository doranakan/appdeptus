import { useCounter } from 'ahooks'
import {
  Button,
  HStack,
  ScreenContainer,
  useToast,
  VStack
} from 'appdeptus/components'
import { useUpdateUserNameMutation } from 'appdeptus/modules/user/api'
import { router } from 'expo-router'
import { Check, ChevronLeft, ChevronRight, Save } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import { Platform } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInDown,
  SlideOutDown
} from 'react-native-reanimated'
import Content0 from './Content0'
import Content1 from './Content1'
import Content2 from './Content2'
import Content3 from './Content3'
import Content4 from './Content4'
import Content5 from './Content5'
import Text0 from './Text0'
import Text1 from './Text1'
import Text2 from './Text2'
import Text3 from './Text3'
import Text4 from './Text4'
import Text5 from './Text5'

const OnboardingScreen = () => {
  const [step, { dec, inc }] = useCounter(0, {
    min: 0,
    max: 5
  })

  const [nickname, setNickname] = useState('')

  const [saveNickname, { isLoading }] = useUpdateUserNameMutation()

  const { show } = useToast()

  const Text = useMemo(() => {
    switch (step) {
      case 1:
        return <Text1 />
      case 2:
        return <Text2 />
      case 3:
        return <Text3 />
      case 4:
        return <Text4 />
      case 5:
        return <Text5 />
      default:
        return <Text0 />
    }
  }, [step])

  const Content = useMemo(() => {
    switch (step) {
      case 1:
        return <Content1 />
      case 2:
        return <Content2 />
      case 3:
        return <Content3 />
      case 4:
        return <Content4 />
      case 5:
        return (
          <Content5
            nickname={nickname}
            setNickname={setNickname}
          />
        )
      default:
        return <Content0 />
    }
  }, [nickname, step])

  return (
    <ScreenContainer
      className='px-4 pt-4'
      safeAreaInsets={['top']}
      space='4xl'
    >
      <HStack
        className='justify-between'
        reversed={step < 2 || step > 4}
      >
        {step > 1 && step < 5 ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Button
              variant='callback'
              color='primary'
              onPress={() => {
                dec(1)
              }}
              icon={ChevronLeft}
            />
          </Animated.View>
        ) : null}
        <Animated.View entering={FadeIn.duration(1000).delay(2000)}>
          <Button
            disabled={(step === 5 && !nickname.trim().length) || isLoading}
            loading={isLoading}
            variant='callback'
            onPress={async () => {
              if (step === 5) {
                const res = await saveNickname(nickname)

                if ('error' in res) {
                  show({ title: '⚠️ error', description: String(res.error) })
                  return
                }

                router.replace('/?showNewArmyBottomSheet=true')
              }
              inc(1)
            }}
            icon={step === 5 ? Save : step === 4 ? Check : ChevronRight}
          />
        </Animated.View>
      </HStack>
      <VStack className='py-8'>{Text}</VStack>

      {step > 0 && step < 5 ? (
        <Animated.View
          layout={LinearTransition}
          className='flex-1 rounded-3xl bg-secondary-950 p-4 shadow-md'
          entering={SlideInDown.duration(600)}
          exiting={SlideOutDown}
        >
          <VStack
            className='flex-1 rounded-2xl bg-primary-900 p-4'
            space='md'
          >
            {Platform.select({
              android: (
                <VStack className='h-8 w-8 self-center rounded-full bg-secondary-950' />
              ),
              ios: (
                <VStack className='h-8 w-24 self-center rounded-full bg-secondary-950' />
              )
            })}
            {Content}
          </VStack>
        </Animated.View>
      ) : (
        Content
      )}
    </ScreenContainer>
  )
}

export default OnboardingScreen
