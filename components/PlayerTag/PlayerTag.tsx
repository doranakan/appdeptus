import { type UserProfile } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { Link } from 'expo-router'
import Avatar from '../Avatar'
import Text from '../Text'
import { HStack, Pressable } from '../ui'

type PlayerTagProps = {
  player: UserProfile

  reversed?: boolean
  showHash?: boolean
  linked?: boolean
}

const PlayerTag = ({ player, reversed, showHash, linked }: PlayerTagProps) => {
  const { data: user } = useGetUserProfileQuery()

  const isCurrentUser = user?.id === player.id

  return (
    <Link
      asChild
      href={`user/${player.id}`}
    >
      <Pressable disabled={!linked || isCurrentUser}>
        <HStack
          className='items-center'
          reversed={reversed}
          space='sm'
        >
          <Avatar
            {...player}
            size='sm'
          />
          <Text family='body-bold'>{`@${player.name}`}</Text>
          {showHash ? (
            <Text
              className='text-ellipsis text-primary-300'
              size='xs'
            >
              {`#${player.id.split('-')[0]}`}
            </Text>
          ) : null}
        </HStack>
      </Pressable>
    </Link>
  )
}

export default PlayerTag
