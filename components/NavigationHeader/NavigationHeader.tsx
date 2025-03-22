import { type UserProfile } from 'appdeptus/models'
import { Link, router } from 'expo-router'
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native'
import { memo, type ComponentProps } from 'react'
import Avatar from '../Avatar'
import Button from '../Button'
import NotificationBadge from '../NotificationBadge'
import Progress from '../Progress'
import Text from '../Text'
import { HStack, Pressable, VStack } from '../ui'

type NavigationHeaderProps = {
  title?: string
  progress?: ComponentProps<typeof Progress>
  rightButton?: ComponentProps<typeof Button> & {
    notifications?: number
  }
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
  title,
  progress,
  rightButton,
  ...props
}: NavigationHeaderProps) => (
  <HStack
    className='w-full items-center'
    space='md'
  >
    {/* left items */}
    {props.variant === 'avatar' && props.user ? (
      <Link
        asChild
        href='/user'
      >
        <Pressable>
          <Avatar {...props.user} />
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
    <HStack className='flex-1 justify-center'>
      {progress ? <Progress {...progress} /> : null}
      {title ? (
        <Text
          family='heading-regular'
          size='lg'
        >
          {title}
        </Text>
      ) : null}
    </HStack>

    {/* right items */}
    {rightButton ? (
      <VStack>
        <Button
          {...rightButton}
          icon={rightButton.icon ?? ChevronRight}
        />
        {rightButton?.notifications ? (
          <VStack className='absolute right-[-6] top-[-6]'>
            <NotificationBadge count={rightButton.notifications} />
          </VStack>
        ) : null}
      </VStack>
    ) : (
      // this placeholder makes sure center items are always centered
      <VStack className='h-[52] w-[52]' />
    )}
  </HStack>
)

export default memo(NavigationHeader)
