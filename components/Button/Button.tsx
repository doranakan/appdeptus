import { Button, ButtonSpinner, ButtonText, Icon } from '@gluestack-ui/themed'
import { type LucideIcon } from 'lucide-react-native'
import React from 'react'

type CustomButtonProps = {
  iconSize?: number
  Icon?: LucideIcon
  loading?: boolean
  text?: string
}

const CustomButton = ({
  Icon: LucideIcon,
  iconSize = 18,
  loading,
  text,
  ...props
}: CustomButtonProps) => (
  <Button
    gap='$1'
    disabled
    {...props}
  >
    {loading ? (
      <ButtonSpinner />
    ) : (
      <>
        {text && <ButtonText size='md'>{text}</ButtonText>}
        {LucideIcon && (
          <Icon
            as={LucideIcon}
            color={'white'}
            h={iconSize}
            w={iconSize}
          />
        )}
      </>
    )}
  </Button>
)

export default CustomButton
