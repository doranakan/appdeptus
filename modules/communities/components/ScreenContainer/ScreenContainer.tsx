import {
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  VStack
} from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import { memo, type PropsWithChildren } from 'react'
import { useGetCommunityQuery } from '../../api'

type CommunityScreenContainerProps = PropsWithChildren<{
  title: string
}>

const CommunityScreenContainer = ({
  children,
  title
}: CommunityScreenContainerProps) => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isLoading, isError } = useGetCommunityQuery(id)

  if (isError || isLoading || !data) {
    return (
      <ScreenContainer
        safeAreaInsets={['top', 'bottom']}
        className='p-4'
      >
        <NavigationHeader variant='backButton' />
        <VStack className='flex-1 items-center justify-center'>
          {isLoading ? (
            <Loading />
          ) : (
            <Error description='There was an error with your request.' />
          )}
        </VStack>
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      safeAreaInsets={['top', 'bottom']}
      className='p-4'
      space='md'
    >
      <NavigationHeader
        title={data.name}
        variant='backButton'
      />
      <ScreenTitle>{title}</ScreenTitle>
      {children}
    </ScreenContainer>
  )
}

export default memo(CommunityScreenContainer)
