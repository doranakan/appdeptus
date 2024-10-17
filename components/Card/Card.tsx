import { type PropsWithChildren } from 'react'
import InnerBorder from '../InnerBorder'
import { LinearGradient, VStack } from '../ui'

type CardProps = PropsWithChildren

const Card = ({ children }: CardProps) => (
  <VStack className='w-full rounded-3xl bg-primary-700 shadow-lg'>
    <InnerBorder>
      <LinearGradient
        from='bg-primary-700'
        to='bg-primary-950'
        start={{ x: 0.3, y: 1 }}
        end={{ x: 1, y: 3 }}
      >
        {children}
      </LinearGradient>
    </InnerBorder>
  </VStack>
)

export default Card
