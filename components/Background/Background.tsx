import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { selectThemeName } from '../store'
import { themeColors, VStack } from '../ui'

type BackgroundProps = {
  blurhash: string
  source: string

  gradient?: boolean
}

const Background = ({ blurhash, source, gradient }: BackgroundProps) => {
  const themeName = useSelector(selectThemeName)

  return (
    <VStack className='absolute h-full w-full'>
      <Image
        placeholder={
          Platform.OS === 'ios'
            ? { blurhash, isAnimated: true, cacheKey: source }
            : undefined
        }
        source={source}
        style={styles.image}
        transition={200}
      />
      {gradient ? (
        <LinearGradient
          colors={[
            `${themeColors[themeName].primary[950]}00`,
            themeColors[themeName].primary[950]
          ]}
          style={styles.gradient}
        />
      ) : null}
    </VStack>
  )
}

const styles = StyleSheet.create({
  gradient: { width: '100%', height: '100%' },
  image: { position: 'absolute', width: '100%', height: '100%' }
})
export default memo(Background)
