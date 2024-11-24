import { StyleSheet } from 'react-native'

const defaultScreenOptions = {
  headerShown: false,
  statusBarTranslucent: true
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
