import {
  Avatar,
  Card,
  HStack,
  Pressable,
  Text,
  VStack
} from 'appdeptus/components'
import { type Community } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Link } from 'expo-router'
import { snakeCase } from 'lodash'
import { memo } from 'react'

type MemberListItemProps = {
  member: Community['members'][number]
}

const MemberListItem = ({ member }: MemberListItemProps) => {
  const { data } = useGetUserProfileQuery()

  return (
    <Link
      asChild
      href={`user/${member.id}`}
    >
      <Pressable disabled={member.id === data?.id}>
        <Card>
          <HStack
            className='items-center p-4'
            space='md'
          >
            <Avatar {...member} />
            <VStack>
              <Text
                family='body-bold'
                size='lg'
              >
                {`${snakeCase(member.name)}${member.id === data?.id ? '(you)' : ''}`}
              </Text>
              <Text
                className='text-primary-300'
                family='body-bold'
              >{`#${member.id.split('-')[0]}`}</Text>
            </VStack>
          </HStack>
        </Card>
      </Pressable>
    </Link>
  )
}

export default memo(MemberListItem)
