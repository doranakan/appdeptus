import { useUnmount } from 'ahooks'
import { coreApi } from 'appdeptus/api'
import { Loading, ScreenContainer } from 'appdeptus/components'
import { defaultScreenOptions } from 'appdeptus/constants'
import { useGetSessionQuery } from 'appdeptus/modules/root/api'
import { Redirect, Stack } from 'expo-router'

const HomeLayout = () => {
  const { data: session, isLoading, isUninitialized } = useGetSessionQuery()

  useUnmount(() => {
    coreApi.util.resetApiState()
  })

  if (isLoading || isUninitialized) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
      </ScreenContainer>
    )
  }

  if (!session) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
        <Redirect
          href='root'
          relativeToDirectory={false}
        />
      </ScreenContainer>
    )
  }

  return (
    <Stack
      screenOptions={{
        ...defaultScreenOptions,
        /**
         * we need to disabled navigation animation to avoid errors when the session expires
         * since the short circuit above unmounts this stack without respect
         */
        animation: 'none'
      }}
    >
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}

export default HomeLayout
