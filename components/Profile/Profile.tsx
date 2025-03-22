import { formatDate } from 'date-fns'
import { memo } from 'react'
import Avatar from '../Avatar'
import Text from '../Text'
import { VStack } from '../ui'

type ProfileProps = {
  date: string
  name: string

  image?: string
  variant?: 'community' | 'user'
}

const Profile = ({ date, name, image, variant = 'user' }: ProfileProps) => (
  <VStack
    className='items-center justify-center'
    space='md'
  >
    <Avatar
      name={name}
      image={image}
      size='2xl'
    />
    <VStack
      className='items-center justify-center'
      space='xs'
    >
      <Text
        family='heading-regular'
        size='2xl'
      >
        {name}
      </Text>
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
