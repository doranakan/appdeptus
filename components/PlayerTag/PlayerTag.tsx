import { type UserProfile } from 'appdeptus/models'
import Avatar from '../Avatar'
import Text from '../Text'
import { HStack } from '../ui'

type PlayerTagProps = {
  player: UserProfile

  reversed?: boolean
  showHash?: boolean
}

const PlayerTag = ({ player, reversed, showHash }: PlayerTagProps) => (
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
)

export default PlayerTag
