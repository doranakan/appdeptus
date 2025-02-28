import {
  ArmyBackground,
  Card,
  Pressable,
  Text,
  VStack
} from 'appdeptus/components'
import { type Codex } from 'appdeptus/models'
import { useThemeSwitch } from 'appdeptus/providers/ThemeSwitchProvider/ThemeSwitchContext'
import clsx from 'clsx'
import { memo } from 'react'

type CodexListItemProps = {
  codex: Codex
  onPress: (codex: Codex) => void

  selected?: boolean
}

const CodexListItem = ({ codex, onPress, selected }: CodexListItemProps) => {
  const { switchTheme } = useThemeSwitch()
  return (
    <Pressable
      className='active:opacity-80'
      onPress={({ nativeEvent: { pageX, pageY } }) => {
        onPress(codex)
        switchTheme(codex.name, { x: pageX, y: pageY })
      } }
    >
      <Card
        variant={selected === undefined
          ? 'selectable'
          : selected
            ? 'selected'
            : 'selectable-alt'}
      >
        <VStack
          className={clsx(['absolute h-full w-full', selected && 'opacity-20'])}
        >
          <ArmyBackground codex={codex.name} />
        </VStack>
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
}

export default memo(CodexListItem)
