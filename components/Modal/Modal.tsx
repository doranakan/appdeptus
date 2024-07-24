import { VStack } from '@gluestack-ui/themed'
import { X } from 'lucide-react-native'
import { type PropsWithChildren } from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../Header'

type ModalProps = PropsWithChildren<{
  title: string
}>

const Modal = ({ children, title }: ModalProps) => {
  const insets = useSafeAreaInsets()

  return (
    <VStack flex={1}>
      <VStack
        p='$4'
        pt={Platform.OS === 'android' ? insets.top : undefined}
      >
        <Header
          left={{
            href: '../',
            Icon: X
          }}
          title={title}
        />
      </VStack>

      {children}
    </VStack>
  )
}

export default Modal
