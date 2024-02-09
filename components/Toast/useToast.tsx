import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast as useGSToast
} from '@gluestack-ui/themed'
import { useCallback } from 'react'

type ToastArgs = {
  description: string
  placement?: 'top' | 'bottom'
  title: string
}

const useToast = () => {
  const toast = useGSToast()

  const show = useCallback(
    ({ description, placement = 'bottom', title }: ToastArgs) =>
      toast.show({
        placement,
        render: () => (
          <Toast
            action='attention'
            variant='solid'
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
