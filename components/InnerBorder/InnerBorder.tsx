import { VStack } from 'appdeptus/components/ui'
import clsx from 'clsx'
import { memo, type PropsWithChildren } from 'react'

type InnerBorderProps = PropsWithChildren<{
  opacity?: string
  rounded?: string
  selected?: boolean
}>

const InnerBorder = ({
  children,
  opacity = 'opacity-20',
  rounded = 'rounded-3xl',
  selected
}: InnerBorderProps) => (
  <VStack className={clsx(['overflow-hidden', rounded])}>
    {children}
    <VStack
      className={clsx(['absolute h-full w-full', rounded, opacity])}
      pointerEvents='none'
      style={{ borderWidth: selected ? 2 : 1, borderColor: '#fff' }}
    />
  </VStack>
)

export default memo(InnerBorder)
