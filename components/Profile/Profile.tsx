import { formatDate } from 'date-fns'
import { Link } from 'expo-router'
import { memo } from 'react'
import Avatar from '../Avatar'
import Text from '../Text'
import { Pressable, VStack } from '../ui'

type ProfileProps = {
  date: string
  name: string

  image?: string
  variant?: 'community' | 'user'
  imageLink?: string
  nameLink?: string
}

const Profile = ({
  date,
  name,
  image,
  variant = 'user',
  imageLink,
  nameLink
}: ProfileProps) => (
  <VStack
    className='items-center justify-center'
    space='md'
  >
    <Link
      asChild
      href={imageLink ?? ''}
    >
      <Pressable disabled={!imageLink}>
        <Avatar
          name={name}
          image={image}
          size='2xl'
        />
      </Pressable>
    </Link>
    <VStack
      className='items-center justify-center'
      space='xs'
    >
      <Link
        asChild
        href={nameLink ?? ''}
      >
        <Pressable disabled={!nameLink}>
          <Text
            family='heading-regular'
            size='2xl'
          >
            {name}
          </Text>
        </Pressable>
      </Link>
      <Text
        className='text-primary-400'
        family='body-bold'
      >
        {`${variant === 'user' ? 'Member since' : 'Created on'} ${formatDate(new Date(date), 'MMMM yyyy')}`}
      </Text>
    </VStack>
  </VStack>
)

export default memo(Profile)
