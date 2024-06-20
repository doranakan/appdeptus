import { useRouter } from 'expo-router'
import { Wrench } from 'lucide-react-native'
import ActionButton from './ActionButton'

type EditButtonProps = {
  armyId: string
  codexId: string
}

const EditButton = ({ armyId, codexId }: EditButtonProps) => {
  const router = useRouter()

  return (
    <ActionButton
      Icon={Wrench}
      onPress={() => {
        router.navigate({
          params: { armyId, codexId },
          pathname: '../army-builder/unit-selection'
        })
      }}
      title='Edit'
    />
  )
}

export default EditButton
