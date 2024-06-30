import { Box, Heading, Text, VStack } from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import { AnimatedArmyBackgroundImage, ArmyIcon } from 'appdeptus/components'
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
      <MaskedView
        style={{ height: 200, width: '100%' }}
        maskElement={
          <Box alignItems='center'>
            <ArmyIcon
              codexName={army.codex.name}
              color='$primary500'
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
        />
      </MaskedView>

      <Heading
        color='$primary500'
        size='4xl'
        textAlign='center'
      >
        {army.name}
      </Heading>
      <Text
        color='$white'
        fontWeight='bold'
        size='2xl'
        textAlign='center'
      >
        {`${army.totalPoints} points`}
      </Text>
    </VStack>
  </MotiView>
)

export default Header
