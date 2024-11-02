import {
  ArmyBackground,
  Card,
  Pressable,
  setTheme,
  Text,
  VStack
} from 'appdeptus/components'
import { type Codex, type NewArmy } from 'appdeptus/models'
import { memo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useDispatch } from 'react-redux'

type CodexListItemProps = {
  codex: Codex
}

const CodexListItem = ({ codex }: CodexListItemProps) => {
  const { setValue } = useFormContext<NewArmy>()

  const watch = useWatch<NewArmy>()

  const dispatch = useDispatch()

  return (
    <Pressable
      className='active:opacity-80'
      onPress={() => {
        setValue('codex', codex)
        dispatch(setTheme(codex.name))
      }}
    >
      <Card
        variant={watch.codex?.name === codex.name ? 'selected' : 'selectable'}
      >
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
}

export default memo(CodexListItem)
