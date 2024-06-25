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
      <VStack
        backgroundColor='$backgroundLight100'
        flex={1}
      >
        <HStack
          backgroundColor='$secondary100'
          justifyContent='space-between'
          paddingTop={insets.top}
          pb='$4'
          px='$4'
        >
          <Heading>{title}</Heading>
          <Box>
            <Link
              href='../'
              asChild
            >
              <Pressable
                hitSlop={16}
                onPress={onPressClose}
              >
                <Icon as={X} />
              </Pressable>
            </Link>
          </Box>
        </HStack>
        <ScrollView flex={1}>
          {children}
          <Box h={insets.bottom} />
        </ScrollView>
      </VStack>
    </VStack>
  )
}

export default Modal
