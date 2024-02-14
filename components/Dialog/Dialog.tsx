import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text
} from '@gluestack-ui/themed'
import { noop } from 'lodash'
import { ActivityIndicator } from 'react-native'

type DialogProps = {
  cancelTitle?: string
  confirmTitle?: string
  description: string
  loading?: boolean
  onClose: () => void
  onPressCancel: () => void
  onPressConfirm: () => void
  title: string
  visible: boolean
}

const Dialog = ({
  cancelTitle,
  confirmTitle,
  description,
  loading,
  onClose,
  onPressCancel,
  onPressConfirm,
  title,
  visible
}: DialogProps) => (
  <AlertDialog
    isOpen={visible}
    onClose={loading ? noop : onClose}
  >
    <AlertDialogBackdrop />
    <AlertDialogContent>
      <AlertDialogHeader>
        <Heading size='lg'>{title}</Heading>
        <AlertDialogCloseButton>
          <Icon as={CloseIcon} />
        </AlertDialogCloseButton>
      </AlertDialogHeader>
      <AlertDialogBody>
        <Text size='sm'>{description}</Text>
      </AlertDialogBody>
      <AlertDialogFooter>
        <ButtonGroup space='lg'>
          <Button
            disabled={loading}
            variant='outline'
            action='secondary'
            onPress={loading ? noop : onPressCancel}
          >
            <ButtonText>{cancelTitle ?? 'Cancel'}</ButtonText>
          </Button>
          <Button
            disabled={loading}
            bg='$error600'
            action='negative'
            onPress={loading ? noop : onPressConfirm}
          >
            {loading ? (
              <ActivityIndicator color='white' />
            ) : (
              <ButtonText>{confirmTitle ?? 'Confirm'}</ButtonText>
            )}
          </Button>
        </ButtonGroup>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

export default Dialog
