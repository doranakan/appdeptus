import RNDateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react-native'
import { memo, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import InnerBorder from '../InnerBorder'
import InsetShadow from '../InsetShadow'
import Text from '../Text'
import { HStack, Icon, Pressable, VStack } from '../ui'

type DateTimePickerProps = {
  value: Date
  onChange: (date: Date) => void
}

const DateTimePicker = ({ value, onChange }: DateTimePickerProps) => {
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState<'date' | 'time'>('date')

  return (
    <VStack className='w-full'>
      <InnerBorder>
        <VStack className='bg-primary-800'>
          <InsetShadow>
            <Pressable
              className='h-16 justify-center p-1 px-4'
              onPress={() => {
                setMode('date')
                setShow((v) => !v)
              }}
            >
              <HStack
                className='items-center'
                space='md'
              >
                <Icon
                  as={Calendar}
                  className='color-primary-300'
                />
                <Text
                  className='text-primary-50'
                  style={styles.text}
                >
                  {format(value, 'MMM d, yyyy · HH:mm')}
                </Text>
              </HStack>
            </Pressable>
          </InsetShadow>
        </VStack>
      </InnerBorder>
      {show && (
        <RNDateTimePicker
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          mode={Platform.OS === 'ios' ? 'datetime' : mode}
          textColor='white'
          value={value}
          onChange={(_, date) => {
            if (!date) {
              setShow(false)
              return
            }
            if (Platform.OS === 'android') {
              if (mode === 'date') {
                const updated = new Date(value)
                updated.setFullYear(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                )
                onChange(updated)
                setMode('time')
              } else {
                const updated = new Date(value)
                updated.setHours(date.getHours(), date.getMinutes())
                onChange(updated)
                setShow(false)
                setMode('date')
              }
            } else {
              onChange(date)
            }
          }}
        />
      )}
    </VStack>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'IBMPlexMono_400Regular'
  }
})

export default memo(DateTimePicker)
