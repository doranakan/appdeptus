import clsx from 'clsx'
import { Link } from 'expo-router'
import { ChevronRight, ExternalLink } from 'lucide-react-native'
import { type ReactElement } from 'react'
import Card from '../Card'
import NotificationBadge from '../NotificationBadge'
import Text from '../Text'
import { HStack, Icon, Pressable, VStack } from '../ui'

type CardMenuProps = {
  items: {
    href: string
    variant: 'external' | 'internal'
    title: string

    disabled?: boolean
    notifications?: number
  }[]

  Header?: ReactElement
}

const CardMenu = ({ Header, items }: CardMenuProps) => (
  <Card>
    {Header ? (
      <VStack>
        <VStack className='bg-primary-900 shadow-md'>{Header}</VStack>
        <HStack className='h-[1] bg-primary-50/20' />
      </VStack>
    ) : null}
    {items.map(({ href, title, variant, disabled, notifications }, index) => (
      <Link
        asChild
        key={title}
        href={href}
      >
        <Pressable disabled={disabled}>
          {index ? <HStack className='mx-4 h-[1] bg-primary-50/30' /> : null}
          <HStack className='items-center justify-between p-4'>
            <HStack space='sm'>
              {notifications ? (
                <NotificationBadge count={notifications} />
              ) : null}
              <Text
                className={clsx(disabled && 'text-primary-300')}
                family='body-bold'
              >
                {title}
              </Text>
            </HStack>
            <Icon
              as={variant === 'external' ? ExternalLink : ChevronRight}
              className={disabled ? 'text-primary-300' : 'text-primary-50'}
            />
          </HStack>
        </Pressable>
      </Link>
    ))}
  </Card>
)

export default CardMenu
