import { HStack, Heading, Icon, Pressable, VStack } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { X } from 'lucide-react-native'
import { type PropsWithChildren } from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ModalProps = PropsWithChildren<{
  title: string
}>

const Modal = ({ children, title }: ModalProps) => {
  const insets = useSafeAreaInsets()

  return (
    <VStack flex={1}>
      <HStack
        alignItems='center'
        borderColor='$primary800'
        p='$4'
        pt={Platform.OS === 'android' ? insets.top : undefined}
        justifyContent='space-between'
      >
        <Link
          href='../'
          asChild
        >
          <Pressable hitSlop={16}>
            <Icon
              as={X}
              size='xl'
            />
          </Pressable>
        </Link>
        <Heading
          fontFamily='$mono'
          size='4xl'
          textTransform='capitalize'
        >
          {title}
        </Heading>
        <Link
          href='../'
          asChild
        >
          <Pressable hitSlop={16}>
            <Icon
              as={X}
              size='xl'
            />
          </Pressable>
        </Link>
      </HStack>

      {children}
    </VStack>
  )
}

export default Modal
