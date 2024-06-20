import { useBoolean } from 'ahooks'
import { Dialog, useToast } from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import { Trash2 } from 'lucide-react-native'
import { useCallback } from 'react'
import { useDeleteArmyMutation } from '../../../api'
import ActionButton from './ActionButton'

type DeleteButtonProps = {
  armyId: Army['id']
}

const DeleteButton = ({ armyId }: DeleteButtonProps) => {
  const router = useRouter()

  const [visible, { setFalse: hideDialog, setTrue: showDialog }] = useBoolean()

  const [deleteArmy, { isLoading }] = useDeleteArmyMutation()

  const toast = useToast()

  const handleDeleteArmy = useCallback(async () => {
    const res = await deleteArmy(armyId)

    if ('error' in res) {
      toast({
        description: 'Astropathic communication interrupted',
        title: 'Heresy 😱'
      })
    }

    toast({
      description: 'Army deleted succesfully',
      title: 'Trashed 🗑️'
    })

    router.back()
  }, [armyId, deleteArmy, router, toast])

  return (
    <>
      <ActionButton
        Icon={Trash2}
        onPress={showDialog}
        title='Delete'
      />
      <Dialog
        description='Are you sure you want to delete this army? Your data will be
              permanently removed and cannot be undone.'
        loading={isLoading}
        onClose={hideDialog}
        onPressCancel={hideDialog}
        onPressConfirm={handleDeleteArmy}
        title='Delete army'
        visible={visible}
      />
    </>
  )
}

export default DeleteButton
