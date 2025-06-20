import {
  Avatar,
  Icon,
  Input,
  Pressable,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import {
  useGetUserProfileQuery,
  useUpdateUserImageMutation
} from 'appdeptus/modules/user/api'
import { Upload, User } from 'lucide-react-native'
import { memo } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'

type Content6Props = {
  nickname: string
  setNickname: (text: string) => void
}

const Content6 = ({ setNickname, nickname }: Content6Props) => {
  const { data: user } = useGetUserProfileQuery()

  const [updateImage] = useUpdateUserImageMutation()

  return (
    <Animated.View entering={FadeIn.delay(400)}>
      <VStack space='md'>
        <VStack className='items-center'>
          <Pressable
            onPress={async () => {
              await updateImage(user?.image)
            }}
          >
            {user?.image ? (
              <Avatar
                name=' '
                image={user.image}
                size='2xl'
              />
            ) : (
              <VStack
                className='h-32 w-32 items-center justify-center rounded-full bg-primary-700'
                style={{
                  borderWidth: 1,
                  borderColor: `${themeColors.default.primary[50]}40`
                }}
                space='xs'
              >
                <Icon
                  as={Upload}
                  className='text-primary-50'
                  size='2xl'
                />
                <Text
                  className='uppercase'
                  family='body-bold'
                  size='sm'
                >
                  choose image
                </Text>
              </VStack>
            )}
          </Pressable>
        </VStack>
        <Text
          className='uppercase'
          family='body-bold'
        >
          Nickname
        </Text>
        <Input
          autoFocus
          Icon={User}
          onChangeText={(val) => {
            setNickname(val.replace(' ', '').toLowerCase())
          }}
          value={nickname}
          placeholder='enter_your_battle_name'
        />
      </VStack>
    </Animated.View>
  )
}

export default memo(Content6)
