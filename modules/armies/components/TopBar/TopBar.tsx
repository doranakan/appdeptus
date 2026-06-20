import { skipToken } from '@reduxjs/toolkit/query'
import {
  HStack,
  Icon,
  Pressable,
  ScreenSubtitle,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { mapBattleSizeDp } from 'appdeptus/utils'
import clsx from 'clsx'
import { Info } from 'lucide-react-native'
import { memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetUnitListQuery } from '../../api'
import { useUnitTypes } from '../../hooks'
import InfoBottomSheet from './InfoBottomSheet'
import ref from './ref'

type TopBarProps = {
  subtitle: string
  title: string
  step: 'detachments' | 'units'
}

const TopBar = ({ subtitle, step, title }: TopBarProps) => {
  const { watch } = useFormContext<ArmyBuilder>()

  const points = watch('points')
  const codex = watch('codex')

  const { data } = useGetUnitListQuery(codex ?? skipToken)

  const unitTypes = useUnitTypes(data ?? [], codex.name)

  const battleSize = watch('battleSize')

  const detachments = watch('detachments')

  const counter = useMemo(() => {
    const armyPoints = `${points}pts`
    switch (step) {
      case 'detachments': {
        if (battleSize === 'free') {
          return armyPoints
        }

        const selectedDetachmentPoints = detachments.reduce(
          (acc, d) => acc + d.detachmentPoints,
          0
        )

        const remainingPoints =
          mapBattleSizeDp(battleSize) - selectedDetachmentPoints

        return `${remainingPoints}/${mapBattleSizeDp(battleSize)} DP`
      }
      case 'units':
        return armyPoints
    }
  }, [battleSize, detachments, points, step])

  return (
    <>
      <VStack space='md'>
        <ScreenTitle>{title}</ScreenTitle>
        <HStack className='justify-between'>
          <ScreenSubtitle>{subtitle}</ScreenSubtitle>
          <Pressable
            disabled={step === 'detachments' || unitTypes.length <= 1}
            onPress={() => ref.current?.present()}
          >
            <HStack
              className='items-center'
              space='md'
            >
              <Text
                className='uppercase'
                family='body-bold'
              >
                {counter}
              </Text>
              {step !== 'detachments' && unitTypes.length > 1 ? (
                <Icon
                  as={Info}
                  className={clsx(['text-primary-50', !points && 'opacity-60'])}
                />
              ) : null}
            </HStack>
          </Pressable>
        </HStack>
      </VStack>
      <InfoBottomSheet />
    </>
  )
}

export default memo(TopBar)
