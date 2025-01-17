import { VStack } from '../ui'

const Dots = () => (
  <VStack className='flex-1 overflow-hidden'>
    {/* This stupid workaround is required since on iOS the dotted border is
    support only on all sides */}
    <VStack className='m-[-3] mb-[4] flex-1 border-2 border-dotted border-primary-50' />
  </VStack>
)

export default Dots
