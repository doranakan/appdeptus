import Image from '@d11/react-native-fast-image'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { selectThemeName } from '../store'
import { themeColors, VStack } from '../ui'
import { Asset } from 'expo-asset'

type BackgroundProps = {
  source: string

  gradient?: boolean
}

const Background = ({ source, gradient }: BackgroundProps) => {
  const themeName = useSelector(selectThemeName)

  const image = Asset.fromModule(source)

  return (
    <VStack className='absolute h-full w-full'>
      <Image
        source={{ uri: image.localUri ?? image.uri }}
        style={styles.image}
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
