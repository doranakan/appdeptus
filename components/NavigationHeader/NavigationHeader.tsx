import { type UserProfile } from 'appdeptus/models'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'
import { memo, type ComponentProps } from 'react'
import Avatar from '../Avatar'
import Button from '../Button'
import Progress from '../Progress'
import { HStack } from '../ui'

type NavigationHeaderProps = {
  progress?: ComponentProps<typeof Progress>
  rightButton?: {
    href: string
    icon?: ComponentProps<typeof Button>['icon']
    disabled?: ComponentProps<typeof Button>['disabled']
  }
} & (
  | {
      variant: 'backButton'
    }
  | {
      variant: 'avatar'
      user: UserProfile | undefined
    }
)

const NavigationHeader = ({
  progress,
  rightButton,
  ...props
}: NavigationHeaderProps) => (
  <HStack
    className='w-full items-center justify-between'
    space='md'
  >
    {/* left items */}
    {props.variant === 'avatar' ? <Avatar {...props} /> : null}
    {props.variant === 'backButton' ? (
      <Button
        color='primary'
        variant='link'
        href='../'
        icon={ChevronLeft}
      />
    ) : null}

    {/* center items */}
    {progress ? <Progress {...progress} /> : null}

    {/* right items */}
    {rightButton ? (
      <Button
        {...rightButton}
        variant='link'
        icon={rightButton.icon ?? ChevronRight}
      />
    ) : null}
  </HStack>
)

export default memo(NavigationHeader)
