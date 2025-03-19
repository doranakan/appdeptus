import clsx from 'clsx'
import React, { type ComponentProps, memo } from 'react'
import { ActivityIndicator } from 'react-native'
import InnerBorder from '../InnerBorder'
import {
  AvatarFallbackText,
  AvatarImage,
  Avatar as GSAvatar,
  VStack
} from '../ui'

type AvatarProps = {
  name: string | undefined

  image?: string
  size?: ComponentProps<typeof GSAvatar>['size']
}

const Avatar = ({ size, image, name }: AvatarProps) => (
  <VStack>
    <InnerBorder rounded='full'>
      <GSAvatar size={size}>
        {name ? (
          <>
            <AvatarFallbackText className={clsx(size === '2xl' && 'pt-2')}>
              {name}
            </AvatarFallbackText>
            {image ? (
              <AvatarImage
                source={{
                  uri: image
                }}
              />
            ) : null}
          </>
        ) : (
          <ActivityIndicator />
        )}
      </GSAvatar>
    </InnerBorder>
  </VStack>
)

export default memo(Avatar)
