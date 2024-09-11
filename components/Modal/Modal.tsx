import { VStack } from 'appdeptus/components/ui/vstack'
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
    <VStack className='flex-1'>
      <VStack
        className={` ${Platform.OS === 'android' ? insets.top : undefined} p-4 `}
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
