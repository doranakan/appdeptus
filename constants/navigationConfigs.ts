import { StyleSheet } from 'react-native'

const defaultScreenOptions = {
  headerShown: false,
  // the two following configs are required since Android glitches when we navigate to a formsheet screen
  statusBarTranslucent: true,
  statusBarBackgroundColor: 'transparent'
}

const styles = StyleSheet.create({
  formSheet: {
    height: '100%',
    width: '100%'
  }
})

const formSheetOptions = {
  presentation: 'formSheet' as const,
  contentStyle: styles.formSheet
}

export { defaultScreenOptions, formSheetOptions }
