import { type LucideIcon } from 'lucide-react-native'
import { memo } from 'react'
import InnerBorder from '../InnerBorder'
import { Icon as GSIcon, VStack } from '../ui'

type IconBadgeProps = {
  Icon: LucideIcon

  OptionIcon?: LucideIcon
}

const IconBadge = ({ Icon, OptionIcon }: IconBadgeProps) => (
  <VStack className='overflow-visible rounded-xl bg-primary-950'>
    <InnerBorder rounded='xl'>
      <VStack className='p-2'>
        <GSIcon
          as={Icon}
          className='color-primary-50'
          size='md'
        />
      </VStack>
    </InnerBorder>
    {OptionIcon ? (
      <VStack className='absolute bottom-[-8] self-center rounded-md bg-primary-950 shadow-sm'>
        <InnerBorder rounded='md'>
          <VStack className='p-1'>
            <GSIcon
              as={OptionIcon}
              className='color-primary-50'
              size='xs'
            />
          </VStack>
        </InnerBorder>
      </VStack>
    ) : null}
  </VStack>
)

export default memo(IconBadge)
