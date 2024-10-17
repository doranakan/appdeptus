import { VStack } from 'appdeptus/components/ui'
import { type PropsWithChildren } from 'react'

const InnerBorder = ({ children }: PropsWithChildren) => (
  <VStack className='overflow-hidden rounded-3xl'>
    {children}
    <VStack
      className='absolute h-full w-full rounded-3xl opacity-20'
      pointerEvents='none'
      style={{ borderWidth: 1, borderColor: '#fff' }}
    />
  </VStack>
)

export default InnerBorder
