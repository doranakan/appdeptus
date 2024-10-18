import { type CodexName } from 'appdeptus/models'
import clsx from 'clsx'
import Text from '../Text'
import { HStack, themeColors, VStack } from '../ui'

type BadgeProps = {
  codex?: CodexName
  text: string
}

const Badge = ({ codex, text }: BadgeProps) => (
  <HStack
    className={clsx([
      'overflow-hidden rounded-full border-[1px]',
      !codex && 'border-secondary-500'
    ])}
    style={
      codex && {
        borderColor: themeColors[codex].secondary[500]
      }
    }
  >
    <VStack
      className={clsx([
        'absolute h-full w-full opacity-40',
        !codex && 'bg-secondary-500/40'
      ])}
      style={
        codex && {
          backgroundColor: themeColors[codex].secondary[500]
        }
      }
    />
    <Text className='px-3 py-1 text-typography-50'>{text}</Text>
  </HStack>
)

export default Badge
