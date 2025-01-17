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
import { type Army } from 'appdeptus/models'
import clsx from 'clsx'
import { Info } from 'lucide-react-native'
import React, { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetUnitListQuery } from '../../api'
import { useUnitTypes } from '../../hooks'
import InfoBottomSheet from './InfoBottomSheet'
import ref from './ref'

type TopBarProps = {
  subtitle: string
  title: string
}

const TopBar = ({ subtitle, title }: TopBarProps) => {
  const { watch } = useFormContext<Army>()

  const points = watch('points')
  const codex = watch('codex')

  const { data } = useGetUnitListQuery(codex ?? skipToken)

  const unitTypes = useUnitTypes(data ?? [])

  return (
    <>
      <VStack space='md'>
        <ScreenTitle>{title}</ScreenTitle>
        <HStack className='justify-between'>
          <ScreenSubtitle>{subtitle}</ScreenSubtitle>
          <HStack
            className='items-center'
            space='md'
          >
            <Text
              className='uppercase'
              family='body-bold'
            >
              {`${points}pts`}
            </Text>
            {unitTypes.length > 1 ? (
              <Pressable onPress={() => ref.current?.present()}>
                <Icon
                  as={Info}
                  className={clsx(['text-primary-50', !points && 'opacity-60'])}
                />
              </Pressable>
            ) : null}
          </HStack>
        </HStack>
      </VStack>
      <InfoBottomSheet />
    </>
  )
}

export default memo(TopBar)
