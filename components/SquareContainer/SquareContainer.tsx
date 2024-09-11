import { VStack } from 'appdeptus/components/ui/vstack'
import { type PropsWithChildren } from 'react'

const SquareContainer = ({ children }: PropsWithChildren) => (
  <VStack className='items-center bg-secondary-50 border-secondary-700 rounded-2xl border-2 justify-center h-11 w-11'>
    {children}
  </VStack>
)

export default SquareContainer
