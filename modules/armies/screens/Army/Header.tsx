import MaskedView from '@react-native-masked-view/masked-view'
import {
  AnimatedArmyBackgroundImage,
  ArmyIcon,
  GradientHeading
} from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type Army } from 'appdeptus/models'
import { MotiView } from 'moti'

type HeaderProps = {
  army: Army
}

const Header = ({ army }: HeaderProps) => (
  <MotiView
    from={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 200
    }}
  >
    <VStack className='items-center mb-4'>
      <VStack className='h-[200px] mb-8 w-full'>
        <MaskedView
          style={{ height: '100%', width: '100%' }}
          maskElement={
            <Box className='items-center'>
              <ArmyIcon
                codexName={army.codex.name}
                color='primary500'
                h={200}
                w={200}
              />
            </Box>
          }
        >
          <Box className='bg-primary-700 h-full absolute w-full'></Box>
          <AnimatedArmyBackgroundImage
            codexName={army.codex.name}
            opacity={0.8}
          />
        </MaskedView>
      </VStack>
      <Box className='items-center border-primary-100 border-1 px-8'>
        <Text
          bold
          size='lg'
          className='text-primary-100 tracking-lg leading-lg'
        >
          {`${army.totalPoints} pts`}
        </Text>
      </Box>
      <GradientHeading>{army.name}</GradientHeading>
    </VStack>
  </MotiView>
)

export default Header
