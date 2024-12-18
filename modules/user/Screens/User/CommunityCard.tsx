import {
  Button,
  Card,
  HStack,
  IconBadge,
  Text,
  VStack
} from 'appdeptus/components'
import { ExternalLink, type LucideIcon } from 'lucide-react-native'
import { Linking } from 'react-native'

type CommunityCardProps = {
  cta: string
  description: string
  Icon: LucideIcon
  link: string
  title: string
}

const CommunityCard = ({
  cta,
  description,
  Icon,
  link,
  title
}: CommunityCardProps) => (
  <Card variant='selectable'>
    <VStack
      className='p-4'
      space='md'
    >
      <HStack
        className='items-center'
        space='sm'
      >
        <IconBadge Icon={Icon} />
        <Text
          className='uppercase'
          family='body-bold'
        >
          {title}
        </Text>
      </HStack>
      <Text
        family='body-regular-italic'
        size='sm'
      >
        {description}
      </Text>
      <Button
        onPress={() => {
          Linking.openURL(link)
        }}
        variant='callback'
        color='secondary'
        icon={ExternalLink}
        text={cta}
        size='sm'
      />
    </VStack>
  </Card>
)

export default CommunityCard
