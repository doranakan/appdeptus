import { type UserProfile } from 'appdeptus/models'
import { snakeCase } from 'lodash'
import Avatar from '../Avatar'
import Text from '../Text'
import { HStack } from '../ui'

type PlayerTagProps = {
  player: UserProfile

  reversed?: boolean
}

const PlayerTag = ({ player, reversed }: PlayerTagProps) => (
  <HStack
    className='items-center'
    reversed={reversed}
    space='sm'
  >
    <Avatar
      {...player}
      size='sm'
    />
    <Text family='body-bold'>{`@${snakeCase(player.name)}`}</Text>
  </HStack>
)

export default PlayerTag
