import { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import Card from '../Card'
import Text from '../Text'
import { VStack } from '../ui'
import { Toast, useToast as useGSToast } from '../ui/toast'

export type ShowCb = {
  description: string
  title: string
}

const useToast = () => {
  const { show: showGSToast, ...rest } = useGSToast()

  const window = useWindowDimensions()

  const show = useCallback(
    ({ description, title }: ShowCb) => {
      showGSToast({
        render: ({ id }) => {
          return (
            <Toast
              className='bg-transparent shadow-none'
              nativeID={id}
              style={{ width: window.width }}
            >
              <Card>
                <VStack
                  className='w-full p-4'
                  space='md'
                >
                  <Text family='heading-regular'>{title}</Text>
                  <Text>{description}</Text>
                </VStack>
              </Card>
            </Toast>
          )
        }
      })
    },
    [showGSToast, window.width]
  )

  return {
    ...rest,
    show
  }
}

export default useToast
