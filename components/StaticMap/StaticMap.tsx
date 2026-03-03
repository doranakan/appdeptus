import { memo, useCallback } from 'react'
import { Image, Linking, Platform, StyleSheet } from 'react-native'
import InnerBorder from '../InnerBorder'
import { Pressable } from '../ui'

type StaticMapProps = {
  lat: string
  lon: string
  height?: number
  zoom?: number
}

const StaticMap = ({ lat, lon, height = 150, zoom = 14 }: StaticMapProps) => {
  const apiKey = process.env.EXPO_PUBLIC_STADIA_MAPS_API_KEY

  const openMaps = useCallback(() => {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lon)

    if (Platform.OS === 'ios') {
      Linking.openURL(
        `maps://maps.apple.com/?q=${latitude},${longitude}`
      ).catch(() => {
        Linking.openURL(
          `https://maps.apple.com/?q=${latitude},${longitude}`
        )
      })
    } else {
      Linking.openURL(`geo:${latitude},${longitude}`).catch(() => {
        Linking.openURL(
          `https://maps.google.com/?q=${latitude},${longitude}`
        )
      })
    }
  }, [lat, lon])

  if (!apiKey) {
    return null
  }

  return (
    <Pressable onPress={openMaps}>
      <InnerBorder rounded='3xl'>
        <Image
          source={{
            uri: `https://tiles.stadiamaps.com/static/alidade_smooth.png?center=${lat},${lon}&zoom=${zoom}&size=400x${height}&m=${lat},${lon},,,&api_key=${apiKey}`
          }}
          style={[styles.image, { height }]}
          resizeMode='cover'
        />
      </InnerBorder>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%'
  }
})

export default memo(StaticMap)
