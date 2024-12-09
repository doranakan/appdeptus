import { type UserProfile } from 'appdeptus/models'
import clsx from 'clsx'
import React, { type ComponentProps, memo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import InnerBorder from '../InnerBorder'
import { AvatarFallbackText, AvatarImage, Avatar as GSAvatar } from '../ui'

type AvatarProps = {
  user: UserProfile | undefined

  size?: ComponentProps<typeof GSAvatar>['size']
}

const Avatar = ({ size, user }: AvatarProps) => (
  <View>
    <InnerBorder rounded='full'>
      <GSAvatar size={size}>
        {user ? (
          <>
            <AvatarFallbackText className={clsx(size === '2xl' && 'pt-2')}>
              {user.name}
            </AvatarFallbackText>
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
