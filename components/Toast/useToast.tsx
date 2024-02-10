import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast as useGSToast
} from '@gluestack-ui/themed'
import { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ToastArgs = {
  description: string
  placement?: 'top' | 'bottom'
  title: string
}

const useToast = () => {
  const toast = useGSToast()

  const { bottom } = useSafeAreaInsets()

  const { width } = useWindowDimensions()

  const show = useCallback(
    ({ description, placement = 'bottom', title }: ToastArgs) =>
      toast.show({
        containerStyle: { width },
        placement,
        render: () => (
          <Toast
            action='attention'
            bgColor='$backgroundLight0'
            mb={bottom + 24}
            shadowOpacity={0}
            variant='accent'
          >
            <VStack space='xs'>
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </VStack>
          </Toast>
        )
      }),
    []
  )

  return show
}

export default useToast
