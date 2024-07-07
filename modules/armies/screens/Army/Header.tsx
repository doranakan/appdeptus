import { Box, Heading, VStack } from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import {
  AnimatedArmyBackgroundImage,
  ArmyIcon,
  GradientHeading
} from 'appdeptus/components'
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
    <VStack
      alignItems='center'
      mb='$4'
    >
      <VStack
        h={200}
        mb='$8'
        w='$full'
      >
        <MaskedView
          style={{ height: '100%', width: '100%' }}
          maskElement={
            <Box alignItems='center'>
              <ArmyIcon
                codexName={army.codex.name}
                color='primary500'
                h={200}
                w={200}
              />
            </Box>
          }
        >
          <Box
            bg='$primary700'
            h='$full'
            position='absolute'
            w='$full'
          ></Box>
          <AnimatedArmyBackgroundImage
            codexName={army.codex.name}
            opacity={0.8}
            type='codex'
          />
        </MaskedView>
      </VStack>
      <Box
        alignItems='center'
        borderColor='$primary100'
        borderWidth='$1'
        px='$8'
      >
        <Heading
          color='$primary100'
          letterSpacing='$lg'
          lineHeight='$lg'
          size='lg'
          textTransform='uppercase'
        >
          {`${army.totalPoints} pts`}
        </Heading>
      </Box>
      <GradientHeading>{army.name}</GradientHeading>
    </VStack>
  </MotiView>
)

export default Header
