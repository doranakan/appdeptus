import {
  Button,
  ButtonSpinner,
  ButtonText
} from 'appdeptus/components/ui/button'
import { Icon } from 'appdeptus/components/ui/icon'
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
    disabled
    {...props}
    className='gap-1'
  >
    {loading ? (
      <ButtonSpinner />
    ) : (
      <>
        {text && <ButtonText size='md'>{text}</ButtonText>}
        {LucideIcon && (
          <Icon
            as={LucideIcon}
            className={` w-${iconSize} h-${iconSize} text-white `}
          />
        )}
      </>
    )}
  </Button>
)

export default CustomButton
