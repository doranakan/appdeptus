import { VStack } from 'appdeptus/components/ui'
import clsx from 'clsx'
import { memo, type PropsWithChildren } from 'react'

type InnerBorderProps = PropsWithChildren<{
  opacity?: string
  rounded?: keyof typeof radiuses
  selected?: boolean
}>

const InnerBorder = ({
  children,
  opacity = 'opacity-20',
  rounded = '3xl',
  selected
}: InnerBorderProps) => (
  <VStack className={clsx(['overflow-hidden', radiuses[rounded]])}>
    {children}
    <VStack
      className={clsx(['absolute h-full w-full', radiuses[rounded], opacity])}
      pointerEvents='none'
      style={{ borderWidth: selected ? 2 : 1, borderColor: '#fff' }}
    />
  </VStack>
)

const radiuses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
}

export default memo(InnerBorder)
