import { type PropsWithChildren } from 'react'
import InnerBorder from '../InnerBorder'
import InsetShadow from '../InsetShadow'
import { VStack } from '../ui'

const EmbarkedUnit = ({ children }: PropsWithChildren) => (
  <InnerBorder rounded='2xl'>
    <InsetShadow>
      <VStack className='rounded-2xl bg-primary-800 p-4'>{children}</VStack>
    </InsetShadow>
  </InnerBorder>
)

export default EmbarkedUnit
