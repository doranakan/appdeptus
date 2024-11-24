import { memo } from 'react'
import { StyleSheet } from 'react-native'
import Text from '../Text'
import { HStack, VStack } from '../ui'

type GameDataTableProps = {
  data: {
    title: string
    valueL: string
    valueR: string
  }[]
}

const GameDataTable = ({ data }: GameDataTableProps) => (
  <VStack>
    {data.map(({ title, valueL, valueR }) => (
      <VStack key={title}>
        <Line />
        <HStack className='items-center py-2'>
          <Text
            className='flex-1'
            family='body-bold'
            numberOfLines={1}
          >
            {valueL}
          </Text>
          <Text className='px-2 text-center'>{title}</Text>
          <Text
            className='flex-1 text-right'
            family='body-bold'
            numberOfLines={1}
          >
            {valueR}
          </Text>
        </HStack>
      </VStack>
    ))}
    <Line />
  </VStack>
)

const Line = () => (
  <HStack
    className='bg-primary-50/30'
    style={styles.line}
  />
)

const styles = StyleSheet.create({
  line: {
    height: 1
  }
})

export default memo(GameDataTable)
