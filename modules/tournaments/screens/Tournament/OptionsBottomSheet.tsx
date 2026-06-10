import { useBoolean } from 'ahooks'
import {
  BottomSheet,
  Button,
  ButtonGroup,
  Card,
  HStack,
  OptionButton,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { type Tournament } from 'appdeptus/models'
import { router } from 'expo-router'
import { Play, RefreshCw, ShareIcon, Shield } from 'lucide-react-native'
import { memo, useCallback, useState } from 'react'
import { Platform, Share } from 'react-native'
import { useUpdateTournamentStatusMutation } from '../../api'
import ref from './ref'

type ConfirmAction = 'ready' | 'reopen' | null

const confirmCopy: Record<
  NonNullable<ConfirmAction>,
  { title: string, confirm: string }
> = {
  ready: {
    title: 'Lock registrations and move to Ready?',
    confirm: 'Set Ready'
  },
  reopen: {
    title: 'Reopen registrations?',
    confirm: 'Reopen'
  }
}

type OptionsBottomSheetProps = {
  tournament: Tournament
}

const OptionsBottomSheet = ({ tournament }: OptionsBottomSheetProps) => {
  const { show } = useToast()
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null)
  const [isExecuting, { setTrue: startExecuting, setFalse: stopExecuting }] =
    useBoolean(false)

  const [updateTournamentStatus] = useUpdateTournamentStatusMutation()

  const dismiss = useCallback(() => {
    ref.current?.dismiss()
    setConfirmAction(null)
  }, [])

  const handleShare = useCallback(() => {
    dismiss()

    const url = `https://open.appdeptus.com/tournament-register.html?id=${tournament.id}`

    Share.share({
      title: `Join ${tournament.name}`,
      message: Platform.select({
        android: `You're invited to join ${tournament.name} on Appdeptus!\n${url}`,
        ios: `You're invited to join ${tournament.name} on Appdeptus!`
      }),
      url
    }).catch(() => {
      show({ title: '⚠️ Error', description: 'Failed to share tournament' })
    })
  }, [dismiss, tournament.id, tournament.name, show])

  const handleStart = useCallback(() => {
    dismiss()
    router.push(`/tournament/${tournament.id}/start-pairing`)
  }, [dismiss, tournament.id])

  const handleConfirm = useCallback(async () => {
    if (!confirmAction) return

    startExecuting()

    if (confirmAction === 'ready') {
      const result = await updateTournamentStatus({
        id: tournament.id,
        status: 'ready'
      })
      stopExecuting()
      if ('error' in result) {
        show({ title: '⚠️ Error', description: String(result.error) })
        return
      }
      dismiss()
      return
    }

    if (confirmAction === 'reopen') {
      const result = await updateTournamentStatus({
        id: tournament.id,
        status: 'open'
      })
      stopExecuting()
      if ('error' in result) {
        show({ title: '⚠️ Error', description: String(result.error) })
        return
      }
      dismiss()
    }
  }, [
    confirmAction,
    dismiss,
    show,
    startExecuting,
    stopExecuting,
    tournament.id,
    updateTournamentStatus
  ])

  return (
    <BottomSheet
      onPressBackdrop={dismiss}
      ref={ref}
      scrollDisabled
    >
      <VStack space='md'>
        <Text
          className='text-center'
          family='body-bold'
        >
          Options
        </Text>

        <HStack style={{ justifyContent: 'space-evenly' }}>
          {tournament.status === 'open' ? (
            <>
              <OptionButton
                disabled={Boolean(confirmAction)}
                icon={ShareIcon}
                onPress={handleShare}
                text='Share'
                variant='callback'
              />
              <OptionButton
                disabled={Boolean(confirmAction)}
                icon={Shield}
                onPress={() => {
                  setConfirmAction('ready')
                }}
                text='Set Ready'
                variant='callback'
              />
            </>
          ) : null}

          {tournament.status === 'ready' ? (
            <>
              <OptionButton
                disabled={Boolean(confirmAction)}
                icon={RefreshCw}
                onPress={() => {
                  setConfirmAction('reopen')
                }}
                text='Reopen'
                variant='callback'
              />
              <OptionButton
                disabled={Boolean(confirmAction)}
                icon={Play}
                onPress={handleStart}
                text='Start'
                variant='callback'
              />
            </>
          ) : null}
        </HStack>

        {confirmAction ? (
          <Card>
            <HStack
              className='items-center p-4'
              space='md'
            >
              <Text className='flex-1'>{confirmCopy[confirmAction].title}</Text>
              <ButtonGroup>
                <Button
                  color='primary'
                  disabled={isExecuting}
                  onPress={() => {
                    setConfirmAction(null)
                  }}
                  size='sm'
                  text='Cancel'
                  variant='callback'
                />
                <Button
                  loading={isExecuting}
                  onPress={handleConfirm}
                  size='sm'
                  text={confirmCopy[confirmAction].confirm}
                  variant='callback'
                />
              </ButtonGroup>
            </HStack>
          </Card>
        ) : null}
      </VStack>
    </BottomSheet>
  )
}

export default memo(OptionsBottomSheet)
