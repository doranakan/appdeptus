import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BlurView } from 'expo-blur'
import { memo, type PropsWithChildren } from 'react'
import { Platform, StyleSheet, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import InnerBorder from '../InnerBorder'
import { Pressable, VStack } from '../ui'
import ref from './ref'

const BottomSheet = ({ children }: PropsWithChildren) => {
  const window = useWindowDimensions()

  const { bottom, top } = useSafeAreaInsets()

  return (
    <BottomSheetModal
      ref={ref}
      style={styles.container}
      backgroundStyle={styles.container}
      handleComponent={null}
      detached={false}
      overDragResistanceFactor={0}
      maxDynamicContentSize={window.height - top}
      backdropComponent={() => (
        <Pressable
          className='absolute h-full w-full'
          onPress={() => {
            ref.current?.dismiss()
          }}
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <InnerBorder>
          <BlurView
            intensity={Platform.OS === 'android' ? 40 : 10}
            tint='regular'
          >
            <VStack
              className='overflow-visible p-4'
              space='md'
            >
              <VStack className='z-10 h-1 w-16 self-center rounded-full bg-primary-50' />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingBottom: bottom }}
              >
                {children}
              </ScrollView>
            </VStack>
          </BlurView>
        </InnerBorder>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    minHeight: 10
  }
})

export default memo(BottomSheet)
