import { VStack } from 'appdeptus/components/ui'
import clsx from 'clsx'
import { memo, type PropsWithChildren } from 'react'

type InnerBorderProps = PropsWithChildren<{
  rounded?: string
  opacity?: string
}>

const InnerBorder = ({
  children,
  opacity = 'opacity-20',
  rounded = 'rounded-3xl'
}: InnerBorderProps) => (
  <VStack className={clsx(['overflow-hidden', rounded])}>
    {children}
    <VStack
      className={clsx(['absolute h-full w-full', rounded, opacity])}
      pointerEvents='none'
      style={{ borderWidth: 1, borderColor: '#fff' }}
    />
  </VStack>
)

export default memo(InnerBorder)
