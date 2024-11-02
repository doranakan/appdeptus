import {
  ArmyBackground,
  Card,
  Pressable,
  Text,
  VStack
} from 'appdeptus/components'
import { type Codex } from 'appdeptus/models'
import { memo } from 'react'

type CodexListItemProps = {
  codex: Codex
  onPress: (codex: Codex) => void
  selected: boolean
}

const CodexListItem = ({ codex, onPress, selected }: CodexListItemProps) => (
  <Pressable
    className='active:opacity-80'
    onPress={() => {
      onPress(codex)
    }}
  >
    <Card variant={selected ? 'selected' : 'selectable'}>
      <ArmyBackground codex={codex.name} />
      <VStack className='p-4'>
        <Text
          family='body-bold'
          size='lg'
        >
          {codex.name}
        </Text>
      </VStack>
    </Card>
  </Pressable>
)

export default memo(CodexListItem)
