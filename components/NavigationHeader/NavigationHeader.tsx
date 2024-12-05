import { type UserProfile } from 'appdeptus/models'
import { Link } from 'expo-router'
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native'
import { memo, type ComponentProps } from 'react'
import Avatar from '../Avatar'
import Button from '../Button'
import Progress from '../Progress'
import { HStack, Pressable } from '../ui'

type NavigationHeaderProps = {
  progress?: ComponentProps<typeof Progress>
  rightButton?: ComponentProps<typeof Button>
} & (
  | {
      variant: 'backButton' | 'closeButton'
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
    {props.variant === 'avatar' ? (
      <Link
        asChild
        href='/user'
      >
        <Pressable>
          <Avatar {...props} />
        </Pressable>
      </Link>
    ) : null}
    {props.variant === 'backButton' ? (
      <Button
        color='primary'
        variant='link'
        href='../'
        icon={ChevronLeft}
      />
    ) : null}
    {props.variant === 'closeButton' ? (
      <Button
        color='primary'
        variant='link'
        href='../'
        icon={X}
      />
    ) : null}

    {/* center items */}
    {progress ? <Progress {...progress} /> : null}

    {/* right items */}
    {rightButton ? (
      <Button
        {...rightButton}
        icon={rightButton.icon ?? ChevronRight}
      />
    ) : null}
  </HStack>
)

export default memo(NavigationHeader)
