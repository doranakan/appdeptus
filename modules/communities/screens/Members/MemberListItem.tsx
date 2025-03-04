import { Pressable, UserListItem } from 'appdeptus/components'
import { type Community } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Link } from 'expo-router'
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
        <UserListItem
          user={member}
          current={member.id === data?.id}
        />
      </Pressable>
    </Link>
  )
}

export default memo(MemberListItem)
