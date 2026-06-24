import { MapPin } from 'lucide-react-native'
import { memo, useCallback, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import InnerBorder from '../InnerBorder'
import InsetShadow from '../InsetShadow'
import StaticMap from '../StaticMap'
import Text from '../Text'
import {
  Input as InputContainer,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
  VStack
} from '../ui'

type Suggestion = {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

type SelectedLocation = {
  lat: string
  lon: string
}

type AddressAutocompleteProps = {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
}

const AddressAutocomplete = ({
  value,
  onChange,
  onBlur,
  placeholder
}: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([])
      return
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'appdeptus/1.0'
          }
        }
      )
      const data = (await res.json()) as unknown

      if (
        Array.isArray(data) &&
        data.every(
          (item) =>
            typeof item === 'object' &&
            item !== null &&
            'place_id' in item &&
            'display_name' in item &&
            'lat' in item &&
            'lon' in item
        )
      ) {
        setSuggestions(data as Suggestion[])
      } else {
        setSuggestions([])
      }
    } catch {
      setSuggestions([])
    }
  }, [])

  const onChangeText = useCallback(
    (text: string) => {
      onChange(text)
      setSelectedLocation(null)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(async () => {
        await fetchSuggestions(text)
      }, 400)
    },
    [fetchSuggestions, onChange]
  )

  const onSelect = useCallback(
    (suggestion: Suggestion) => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current)
      onChange(suggestion.display_name)
      setSelectedLocation({ lat: suggestion.lat, lon: suggestion.lon })
      setSuggestions([])
    },
    [onChange]
  )

  const handleBlur = useCallback(() => {
    blurTimeoutRef.current = setTimeout(() => {
      setSuggestions([])
      onBlur?.()
    }, 1000)
  }, [onBlur])

  return (
    <VStack
      className='w-full'
      space='xs'
    >
      <InnerBorder>
        <VStack className='bg-primary-800'>
          <InsetShadow>
            <VStack className='h-16 justify-center p-1 px-4'>
              <InputContainer
                className='border-0'
                variant='outline'
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputSlot>
                  <InputIcon as={MapPin} />
                </InputSlot>
                <InputField
                  className='text-primary-50'
                  placeholder={placeholder ?? 'Tournament location'}
                  onBlur={handleBlur}
                  onChangeText={onChangeText}
                  style={styles.textField}
                  value={value}
                />
              </InputContainer>
            </VStack>
          </InsetShadow>
        </VStack>
      </InnerBorder>

      {suggestions.length > 0 && (
        <InnerBorder rounded='xl'>
          <VStack className='bg-primary-800'>
            {suggestions.map((s, i) => (
              <Pressable
                key={s.place_id}
                onPress={() => {
                  onSelect(s)
                }}
              >
                <VStack
                  className={`px-4 py-3 ${i < suggestions.length - 1 ? 'border-b border-primary-700' : ''}`}
                >
                  <Text
                    className='text-primary-50'
                    numberOfLines={2}
                    style={styles.textField}
                  >
                    {s.display_name}
                  </Text>
                </VStack>
              </Pressable>
            ))}
          </VStack>
        </InnerBorder>
      )}

      {selectedLocation ? (
        <StaticMap
          lat={selectedLocation.lat}
          lon={selectedLocation.lon}
        />
      ) : null}
    </VStack>
  )
}

const styles = StyleSheet.create({
  textField: {
    fontFamily: 'IBMPlexMono_400Regular'
  }
})

export default memo(AddressAutocomplete)
