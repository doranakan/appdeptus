import { type UserProfile } from 'appdeptus/models'
import React, { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import InnerBorder from '../InnerBorder'
import { AvatarFallbackText, AvatarImage, Avatar as GSAvatar } from '../ui'

type AvatarProps = {
  user: UserProfile | undefined
}

const Avatar = ({ user }: AvatarProps) => (
  <View>
    <InnerBorder rounded='rounded-full'>
      <GSAvatar>
        {user ? (
          <>
            <AvatarFallbackText>{user.name}</AvatarFallbackText>
            {user.image ? (
              <AvatarImage
                source={{
                  uri: user.image
                }}
              />
            ) : null}
          </>
        ) : (
          <ActivityIndicator />
        )}
      </GSAvatar>
    </InnerBorder>
  </View>
)

export default memo(Avatar)
