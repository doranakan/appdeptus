import { Box } from 'appdeptus/components/ui/box'
import { ActivityIndicator } from 'react-native'

const Loading = () => (
  <Box className='items-center flex-1 justify-center'>
    <ActivityIndicator />
  </Box>
)

export default Loading
