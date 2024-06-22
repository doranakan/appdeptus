import { Text, VStack } from '@gluestack-ui/themed'
import { Loading } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import { useFormContext } from 'react-hook-form'
import { useGetCodexesQuery } from '../../api'

const CodexSelectionScreen = () => {
  const router = useRouter()

  const { data: codexes } = useGetCodexesQuery()

  const { reset } = useFormContext<ArmyForm>()

  if (!codexes) {
    return <Loading />
  }

  return (
    <VStack
      alignItems='center'
      flex={1}
      justifyContent='center'
    >
      <Text>Work in progress 🚧</Text>
    </VStack>
  )
}

export default CodexSelectionScreen
