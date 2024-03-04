import { useRouter } from 'expo-router'
import ActionButton from './ActionButton'

type EditButtonProps = {
  armyId: string
  codexId: string
}

const EditButton = ({ armyId, codexId }: EditButtonProps) => {
  const router = useRouter()

  return (
    <ActionButton
      iconName='wrench'
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
