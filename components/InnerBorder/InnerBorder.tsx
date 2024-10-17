import { VStack } from 'appdeptus/components/ui'
import { clsx } from 'clsx'
import { type PropsWithChildren } from 'react'

type InnerBorderProps = PropsWithChildren<{ className?: `rounded-${string}` }>

const InnerBorder = ({ children, className }: InnerBorderProps) => (
  <VStack className={clsx('overflow-hidden rounded-3xl', className)}>
    {children}
    <VStack
      className={clsx(
        'absolute h-full w-full rounded-3xl opacity-20',
        className
      )}
      pointerEvents='none'
      style={{ borderWidth: 1, borderColor: '#fff' }}
    />
  </VStack>
)

export default InnerBorder
