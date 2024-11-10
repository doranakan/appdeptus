import { EnhancementListItem, VStack } from 'appdeptus/components'
import { type Enhancement } from 'appdeptus/models'
import { memo } from 'react'

type EnhancementListProps = {
  enhancements: Enhancement[]
}

const EnhancementList = ({ enhancements }: EnhancementListProps) => (
  <VStack space='md'>
    {enhancements.map((enhancement) => (
      <EnhancementListItem
        enhancement={enhancement}
        key={enhancement.id}
      />
    ))}
  </VStack>
)

export default memo(EnhancementList)
