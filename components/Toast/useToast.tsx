import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast
} from 'appdeptus/components/ui/toast'
import { VStack } from 'appdeptus/components/ui/vstack'
import { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ToastArgs = {
  description: string
  placement?: 'top' | 'bottom'
  title: string
}

const useCustomToast = () => {
  const toast = useToast()

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
            shadowOpacity={0}
            variant='accent'
            className={` mb-${bottom + 24} bg-backgroundLight-0 `}
          >
            <VStack space='xs'>
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </VStack>
          </Toast>
        )
      }) as void,
    [bottom, toast, width]
  )

  return show
}

export default useCustomToast
