import { FlatList, StyleSheet } from 'react-native'
import Text from '../Text'
import { HStack } from '../ui'

type GameDataTableProps = {
  data: {
    title: string
    valueL: string
    valueR: string
  }[]
}

const GameDataTable = ({ data }: GameDataTableProps) => (
  <FlatList
    data={data}
    keyExtractor={({ title }) => title}
    ListHeaderComponent={Line}
    ItemSeparatorComponent={Line}
    ListFooterComponent={Line}
    renderItem={({ item }) => (
      <HStack className='py-2'>
        <Text
          className='flex-1'
          family='body-bold'
          size='lg'
        >
          {item.valueL}
        </Text>
        <Text
          className='flex-1 text-center'
          size='lg'
        >
          {item.title}
        </Text>
        <Text
          className='flex-1 text-right'
          size='lg'
        >
          {item.valueR}
        </Text>
      </HStack>
    )}
  />
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

export default GameDataTable
