import { Input } from 'appdeptus/components'
import { lowerCase } from 'lodash'
import { User } from 'lucide-react-native'
import { memo } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'

type Content6Props = {
  nickname: string
  setNickname: (text: string) => void
}

const Content6 = ({ setNickname, nickname }: Content6Props) => (
  <Animated.View entering={FadeIn.delay(400)}>
    <Input
      autoFocus
      Icon={User}
      onChangeText={(val) => {
        setNickname(lowerCase(val.replace(' ', '')))
      }}
      value={nickname}
      placeholder='enter_your_battle_name'
    />
  </Animated.View>
)

export default memo(Content6)
