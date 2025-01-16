import { Input } from 'appdeptus/components'
import { User } from 'lucide-react-native'
import { memo } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'

type Content5Props = {
  nickname: string
  setNickname: (text: string) => void
}

const Content5 = ({ setNickname, nickname }: Content5Props) => (
  <Animated.View entering={FadeIn.delay(400)}>
    <Input
      autoFocus
      Icon={User}
      onChangeText={setNickname}
      value={nickname}
      placeholder='enter_your_battle_name'
    />
  </Animated.View>
)

export default memo(Content5)
