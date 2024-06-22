import { Box, ButtonText, Heading, ScrollView } from '@gluestack-ui/themed'
import { type PropsWithChildren } from 'react'
import { Modal as RNModal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ModalProps = PropsWithChildren<{
  onPressClose: () => void
  title: string
  visible: boolean
}>

const Modal = ({ children, onPressClose, title, visible }: ModalProps) => {
  const insets = useSafeAreaInsets()

  return (
    <RNModal
      animationType='slide'
      transparent
      visible={visible}
    >
      <Box
        flex={1}
        paddingTop={insets.top}
      >
        <Box
          backgroundColor='$backgroundLight100'
          borderTopLeftRadius='$md'
          borderTopRightRadius='$md'
          flex={1}
          softShadow='4'
        >
          <Box
            alignItems='center'
            backgroundColor='$backgroundLight0'
            borderBottomWidth='$1'
            borderColor='$light300'
            justifyContent='center'
            p='$4'
          >
            <Heading>{title}</Heading>
            <Box
              alignItems='center'
              position='absolute'
              p='$4'
              right={0}
            >
              <ButtonText
                color='$primary500'
                onPress={onPressClose}
              >
                Close
              </ButtonText>
            </Box>
          </Box>
          <ScrollView flex={1}>
            {children}
            <Box h={insets.bottom} />
          </ScrollView>
        </Box>
      </Box>
    </RNModal>
  )
}

export default Modal
