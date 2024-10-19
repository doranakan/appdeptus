import { type CodexName } from 'appdeptus/models'
import clsx from 'clsx'
import Text from '../Text'
import { HStack, themeColors, VStack } from '../ui'

type BadgeProps = {
  text: string

  codex?: CodexName
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const Badge = ({ codex, text, variant = 'secondary' }: BadgeProps) => (
  <HStack
    className={clsx([
      'overflow-hidden rounded-full border-[1px]',
      !codex && `border-${variant}-500`
    ])}
    style={
      codex && {
        borderColor: themeColors[codex][variant][500]
      }
    }
  >
    <VStack
      className={clsx([
        'absolute h-full w-full opacity-60',
        !codex && `bg-${variant}-500/60`
      ])}
      style={
        codex && {
          backgroundColor: themeColors[codex][variant][500]
        }
      }
    />
    <Text className='px-3 py-1'>{text}</Text>
  </HStack>
)

export default Badge
