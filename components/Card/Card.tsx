import { LinearGradient } from 'expo-linear-gradient'
import { type PropsWithChildren } from 'react'
import InnerBorder from '../InnerBorder'
import { VStack } from '../ui'

type CardProps = PropsWithChildren

const Card = ({ children }: CardProps) => (
  <VStack className='w-full rounded-2xl bg-primary-700 shadow-lg'>
    <InnerBorder>
      <LinearGradient
        colors={['rgba(0,0,0,0)', '#2b394f']}
        start={{ x: 0.3, y: 1 }}
        end={{ x: 1, y: 3 }}
      >
        {children}
      </LinearGradient>
    </InnerBorder>
  </VStack>
)

export default Card
