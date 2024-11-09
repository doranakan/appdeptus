import { type CodexName } from 'appdeptus/models'
import clsx from 'clsx'
import { type LucideIcon } from 'lucide-react-native'
import { memo } from 'react'
import Text from '../Text'
import { HStack, Icon as IconComponent, themeColors } from '../ui'

type BadgeProps = {
  text: string

  codex?: CodexName
  Icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const Badge = ({ codex, Icon, text, variant = 'secondary' }: BadgeProps) => (
  <HStack
    className={clsx([
      'items-center rounded-full border-[1px] p-3 py-1',
      !codex && `border-${variant}-500`,
      !codex && `bg-${variant}-500/60`
    ])}
    space='sm'
    style={
      codex && {
        backgroundColor: `${themeColors[codex][variant][500]}60`,
        borderColor: themeColors[codex][variant][500]
      }
    }
  >
    {Icon ? (
      <IconComponent
        as={Icon}
        className='text-primary-50'
        size='sm'
      />
    ) : null}
    <Text>{text}</Text>
  </HStack>
)

export default memo(Badge)
