import { EnhancementListItem, Pressable, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'
import { useGetDetachmentListQuery } from '../../api'

const EnhancementList = () => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const selectedCodex = watch('codex.id')
  const selectedDetachment = watch('detachment.id')

  const { enhancements } = useGetDetachmentListQuery(selectedCodex, {
    selectFromResult: ({ data }) => ({
      enhancements: data?.find(({ id }) => id === selectedDetachment)
        ?.enhancements
    })
  })

  const selectedEnhancements = watch('detachment.enhancements')

  return (
    <FlatList
      data={enhancements}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      keyExtractor={({ id }) => String(id)}
      ListFooterComponent={() => <VStack className='h-4' />}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            const points = watch('points')

            const index = selectedEnhancements.findIndex(
              ({ id }) => id === item.id
            )

            if (index > -1) {
              setValue(
                'detachment.enhancements',
                selectedEnhancements.filter(({ id }) => id !== item.id)
              )
              setValue('points', points - item.points)
              return
            }

            setValue('detachment.enhancements', [...selectedEnhancements, item])
            setValue('points', points + item.points)
          }}
        >
          <EnhancementListItem
            enhancement={item}
            variant={
              selectedEnhancements.map(({ id }) => id).includes(item.id)
                ? 'selected'
                : 'selectable'
            }
          />
        </Pressable>
      )}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default memo(EnhancementList)
