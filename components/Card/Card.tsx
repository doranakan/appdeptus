import { type PropsWithChildren } from 'react'
import InnerBorder from '../InnerBorder'
import { LinearGradient, VStack } from '../ui'

type CardProps = PropsWithChildren

const Card = ({ children }: CardProps) => (
  <VStack className='w-full rounded-2xl bg-primary-700 shadow-lg'>
    <InnerBorder>
      <LinearGradient
        className='bg-gradient-to-br from-primary-700 to-primary-900'
        colors={['rgba(28, 37, 53, 0)', 'rgba(28, 37, 53, 0.6)']}
        start={{ x: 0.3, y: 1 }}
        end={{ x: 1, y: 3 }}
      >
        {children}
      </LinearGradient>
    </InnerBorder>
  </VStack>
)

export default Card
