import {
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  VStack
} from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { X } from 'lucide-react-native'
import { type PropsWithChildren } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ModalProps = PropsWithChildren<{
  onPressClose?: () => void
  title: string
}>

const Modal = ({ children, onPressClose, title }: ModalProps) => {
  const insets = useSafeAreaInsets()

  return (
    <VStack flex={1}>
      <HStack
        alignItems='center'
        bg='$primary700'
        borderColor='$primary800'
        borderBottomWidth='$1'
        justifyContent='space-between'
        opacity='$60'
        paddingTop={insets.top}
        pb='$4'
        px='$4'
      >
        <Heading color='$white'>{title}</Heading>
        <VStack>
          <Link
            href='../'
            asChild
          >
            <Pressable
              hitSlop={16}
              onPress={onPressClose}
            >
              <Icon
                as={X}
                color='$white'
                size='xl'
              />
            </Pressable>
          </Link>
        </VStack>
      </HStack>
      <ScrollView flex={1}>
        {children}
        <Box h={insets.bottom} />
      </ScrollView>
    </VStack>
  )
}

export default Modal
