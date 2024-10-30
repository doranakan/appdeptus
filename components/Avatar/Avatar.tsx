import { type UserProfile } from 'appdeptus/models'
import { memo } from 'react'
import { View } from 'react-native'
import InnerBorder from '../InnerBorder'
import { AvatarFallbackText, AvatarImage, Avatar as GSAvatar } from '../ui'

type AvatarProps = {
  user: UserProfile
}

const Avatar = ({ user }: AvatarProps) => (
  <View>
    <InnerBorder rounded='rounded-full'>
      <GSAvatar>
        <AvatarFallbackText>{user.name}</AvatarFallbackText>
        {user.image ? (
          <AvatarImage
            source={{
              uri: user.image
            }}
          />
        ) : null}
      </GSAvatar>
    </InnerBorder>
  </View>
)

export default memo(Avatar)
