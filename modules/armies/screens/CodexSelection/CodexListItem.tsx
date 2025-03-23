import { ArmyAvatar, Card, Pressable, VStack } from 'appdeptus/components'
import { type Codex } from 'appdeptus/models'
import { memo } from 'react'

type CodexListItemProps = {
  codex: Codex
  onPress: (codex: Codex) => void

  selected?: boolean
}

const CodexListItem = ({ codex, onPress, selected }: CodexListItemProps) => (
  <Pressable
    className='h-full w-full active:opacity-80'
    onPress={() => {
      onPress(codex)
    }}
  >
    <Card
      variant={
        selected === undefined
          ? 'selectable'
          : selected
            ? 'selected'
            : 'selectable-alt'
      }
    >
      <VStack className='h-full w-full'>
        <ArmyAvatar codex={codex.name} />
      </VStack>
    </Card>
  </Pressable>
)

export default memo(CodexListItem)
