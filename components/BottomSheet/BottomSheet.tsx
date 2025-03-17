import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import {
  forwardRef,
  type ForwardRefRenderFunction,
  memo,
  type PropsWithChildren
} from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Backdrop from './Backdrop'

type BottomSheetProps = {
  onDismiss?: () => void
  onPressBackdrop?: () => void
  scrollDisabled?: boolean
}

const BottomSheet: ForwardRefRenderFunction<
  BottomSheetModalMethods,
  PropsWithChildren<BottomSheetProps>
> = ({ children, onDismiss, onPressBackdrop, scrollDisabled }, ref) => (
  <BottomSheetModal
    ref={ref}
    style={styles.container}
    backgroundStyle={styles.container}
    handleComponent={null}
    onDismiss={onDismiss}
    overDragResistanceFactor={5}
    backdropComponent={(props) => (
      <Backdrop
        {...props}
        onPress={onPressBackdrop}
      />
    )}
  >
    <BottomSheetScrollView
      className='overflow-visible'
      contentContainerClassName='p-4 overflow-visible'
      showsVerticalScrollIndicator={false}
      scrollEnabled={!scrollDisabled}
    >
      <SafeAreaView
        edges={['bottom', 'top']}
        style={styles.container}
      >
        {children}
      </SafeAreaView>
    </BottomSheetScrollView>
  </BottomSheetModal>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'visible'
  }
})

export default memo(forwardRef(BottomSheet))
