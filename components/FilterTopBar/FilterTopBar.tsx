import clsx from 'clsx'
import { memo } from 'react'
import { ScrollView } from 'react-native'
import Text from '../Text'
import { HStack, Pressable, VStack } from '../ui'

type FilterTopBarProps<T extends string> = {
  onPress: (value: T) => void
  selectedValue: T
  values: readonly T[]
}

const FilterTopBar = <T extends string>({
  onPress,
  selectedValue,
  values
}: FilterTopBarProps<T>) => (
  <VStack>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ overflow: 'visible' }}
    >
      <HStack space='3xl'>
        {values.map((value) => (
          <Pressable
            key={value}
            className={clsx(
              selectedValue === value ? 'opacity-100' : 'opacity-60'
            )}
            onPress={() => {
              onPress(value)
            }}
          >
            <Text
              className='uppercase'
              family='body-bold'
              size='lg'
            >
              {value}
            </Text>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  </VStack>
)

export default memo(FilterTopBar)
