import { useUnmount } from 'ahooks'
import { coreApi } from 'appdeptus/api'
import { Loading, ScreenContainer } from 'appdeptus/components'
import { defaultScreenOptions } from 'appdeptus/constants'
import { useGetSessionQuery } from 'appdeptus/modules/root/api'
import { useAppDispatch } from 'appdeptus/store'
import { Redirect, Stack } from 'expo-router'

const HomeLayout = () => {
  const { data: session, isLoading, isUninitialized } = useGetSessionQuery()

  const dispatch = useAppDispatch()

  useUnmount(() => {
    dispatch(coreApi.util.resetApiState())
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
    <Stack screenOptions={defaultScreenOptions}>
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}

export default HomeLayout
