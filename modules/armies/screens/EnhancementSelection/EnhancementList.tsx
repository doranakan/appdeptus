import { Card, Pressable, Text, VStack } from 'appdeptus/components'
import { type NewArmy } from 'appdeptus/models'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'
import { useGetDetachmentListQuery } from '../../api'

const EnhancementList = () => {
  const { setValue, watch } = useFormContext<NewArmy>()

  const selectedCodex = watch('codex.id')
  const selectedDetachment = watch('composition.detachment.id')

  const { enhancements } = useGetDetachmentListQuery(selectedCodex, {
    selectFromResult: ({ data }) => ({
      enhancements: data?.find(({ id }) => id === selectedDetachment)
        ?.enhancements
    })
  })

  const selectedEnhancements = watch('composition.detachment.enhancements')

  return (
    <FlatList
      data={enhancements}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            const index = selectedEnhancements.findIndex(
              ({ id }) => id === item.id
            )

            if (index > -1) {
              setValue(
                'composition.detachment.enhancements',
                selectedEnhancements.filter(({ id }) => id !== item.id)
              )
              return
            }
            setValue('composition.detachment.enhancements', [
              ...selectedEnhancements,
              item
            ])
          }}
        >
          <Card
            variant={
              selectedEnhancements.map(({ id }) => id).includes(item.id)
                ? 'selected'
                : 'selectable'
            }
          >
            <VStack className='p-4'>
              <Text family='body-bold'>{item.name}</Text>
            </VStack>
          </Card>
        </Pressable>
      )}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default memo(EnhancementList)
