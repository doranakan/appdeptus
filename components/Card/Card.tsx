import { LinearGradient } from 'expo-linear-gradient'
import { type PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import InnerBorder from '../InnerBorder'
import { selectThemeName } from '../store'
import { themeColors, VStack } from '../ui'

type CardProps = PropsWithChildren

const Card = ({ children }: CardProps) => {
  const themeName = useSelector(selectThemeName)

  return (
    <VStack className='w-full rounded-3xl bg-primary-700 shadow-lg'>
      <InnerBorder>
        <LinearGradient
          colors={[
            themeColors[themeName].primary[700],
            themeColors[themeName].primary[950]
          ]}
          start={{ x: 0.3, y: 1 }}
          end={{ x: 1, y: 3 }}
        >
          {children}
        </LinearGradient>
      </InnerBorder>
    </VStack>
  )
}

export default Card
