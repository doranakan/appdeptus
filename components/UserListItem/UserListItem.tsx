import { type UserProfile } from 'appdeptus/models'
import { snakeCase } from 'lodash'
import { type PropsWithChildren } from 'react'
import Avatar from '../Avatar'
import Card from '../Card'
import Text from '../Text'
import { HStack, VStack } from '../ui'

type UserListItemProps = {
  user: UserProfile

  current?: boolean
}

const UserListItem = ({
  current,
  user,
  children
}: PropsWithChildren<UserListItemProps>) => (
  <Card>
    <HStack
      className='items-center p-4'
      space='md'
    >
      <Avatar {...user} />
      <VStack className='flex-1'>
        <Text
          family='body-bold'
          size='lg'
        >
          {`${snakeCase(user.name)}${current ? '(you)' : ''}`}
        </Text>
        <Text
          className='text-primary-300'
          family='body-bold'
        >{`#${user.id.split('-')[0]}`}</Text>
      </VStack>
      {children}
    </HStack>
  </Card>
)

export default UserListItem
