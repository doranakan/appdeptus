import { Box, VStack } from '@gluestack-ui/themed'
import MaskedView from '@react-native-masked-view/masked-view'
import { type CodexName } from 'appdeptus/models'
import { AnimatePresence, MotiView } from 'moti'
import { SvgXml } from 'react-native-svg'
import { ArmyBackgroundImage } from '../ArmyBackgroundImage'
import mapCodexNameToIcon from './mapCodexNameToIcon'

type AnimatedArmyIconProps = {
  codexName: CodexName
}

const AnimatedArmyIcon = ({ codexName }: AnimatedArmyIconProps) => {
  return (
    <VStack flex={1}>
      <AnimatePresence exitBeforeEnter>
        <MotiView
          key={codexName}
          from={{
            opacity: 0,
            scale: 2
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 2
          }}
          style={{
            alignSelf: 'center',
            position: 'absolute',
            height: '100%',
            width: '100%'
          }}
          exitTransition={{
            duration: 100,
            type: 'timing'
          }}
          transition={{
            duration: 100,
            type: 'timing'
          }}
        >
          <MaskedView
            maskElement={
              <Box flex={1}>
                <SvgXml xml={mapCodexNameToIcon[codexName]} />
              </Box>
            }
          >
            <Box
              h='$full'
              w='$full'
            >
              <ArmyBackgroundImage codexName={codexName} />
            </Box>
          </MaskedView>
        </MotiView>
      </AnimatePresence>
    </VStack>
  )
}

export default AnimatedArmyIcon
