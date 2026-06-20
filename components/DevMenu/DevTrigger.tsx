import { useCallback, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDevMenu } from './DevMenuContext'

const TAP_TARGET = 5
const TAP_WINDOW_MS = 3000

const DevTrigger = () => {
  const { sheetRef } = useDevMenu()
  const insets = useSafeAreaInsets()
  const [count, setCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetCount = useCallback(() => {
    setCount(0)
    timerRef.current = null
  }, [])

  const handlePress = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1
      if (next >= TAP_TARGET) {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = null
        setTimeout(() => setCount(0), 600)
        sheetRef.current?.present()
        return 0
      }
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(resetCount, TAP_WINDOW_MS)
      return next
    })
  }, [sheetRef, resetCount])

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.trigger, { top: insets.top - 8, height: 48 }]}
    >
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  trigger: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 4
  },
  badge: {
    backgroundColor: 'rgba(255,200,0,0.9)',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000'
  }
})

export default DevTrigger
