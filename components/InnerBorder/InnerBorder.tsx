import { VStack } from 'appdeptus/components/ui'
import { type PropsWithChildren } from 'react'
import { clsx } from 'clsx'

type InnerBorderProps = PropsWithChildren<{ className?: `rounded-${string}` }>

const InnerBorder = ({ children, className }: InnerBorderProps) => (
  <VStack className={clsx('overflow-hidden rounded-2xl', className)}>
    {children}
    <VStack
      className={clsx(
        'absolute h-full w-full rounded-2xl opacity-20',
        className
      )}
      pointerEvents='none'
      style={{ borderWidth: 1, borderColor: '#fff' }}
    />
  </VStack>
)

export default InnerBorder
