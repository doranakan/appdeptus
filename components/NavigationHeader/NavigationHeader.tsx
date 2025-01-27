import { type UserProfile } from 'appdeptus/models'
import { Link, router } from 'expo-router'
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native'
import { memo, type ComponentProps } from 'react'
import Avatar from '../Avatar'
import Button from '../Button'
import Progress from '../Progress'
import { HStack, Pressable } from '../ui'
import ScreenTitle from '../ScreenTitle'

type NavigationHeaderProps = {
  progress?: ComponentProps<typeof Progress>
  rightButton?: ComponentProps<typeof Button>
  title?: string
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
  title,
  ...props
}: NavigationHeaderProps) => (
  <HStack
    className='z-10 w-full items-center justify-between'
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
        variant='callback'
        onPress={() => {
          if (router.canGoBack()) {
            router.back()
            return
          }
          router.replace('/')
        }}
        icon={ChevronLeft}
      />
    ) : null}
    {props.variant === 'closeButton' ? (
      <Button
        color='primary'
        variant='callback'
        onPress={() => {
          if (router.canGoBack()) {
            router.back()
            return
          }
          router.replace('/')
        }}
        icon={X}
      />
    ) : null}

    {/* center items */}
    {progress ? <Progress {...progress} /> : null}
    {title ? (
      <ScreenTitle className='max-w-80 text-ellipsis'>{title}</ScreenTitle>
    ) : null}

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
