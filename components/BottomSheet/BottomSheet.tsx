import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { BlurView } from 'expo-blur'
import {
  forwardRef,
  type ForwardRefRenderFunction,
  memo,
  type PropsWithChildren
} from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import InnerBorder from '../InnerBorder'
import { Pressable, VStack } from '../ui'

type BottomSheetProps = {
  onDismiss?: () => void
  onPressBackdrop?: () => void
  scrollDisabled?: boolean
}

const BottomSheet: ForwardRefRenderFunction<
  BottomSheetModalMethods,
  PropsWithChildren<BottomSheetProps>
> = ({ children, onDismiss, onPressBackdrop, scrollDisabled }, ref) => {
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
      onDismiss={onDismiss}
      backdropComponent={() => (
        <Pressable
          className='absolute h-full w-full'
          onPress={onPressBackdrop}
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <InnerBorder>
          <BlurView
            experimentalBlurMethod='dimezisBlurView'
            blurReductionFactor={8}
            intensity={20}
          >
            <VStack
              className='overflow-visible p-4'
              space='md'
            >
              <VStack className='z-10 h-1 w-16 self-center rounded-full bg-primary-50' />
              <ScrollView
                scrollEnabled={!scrollDisabled}
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

export default memo(forwardRef(BottomSheet))
