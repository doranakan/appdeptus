import { Box } from '@gluestack-ui/themed'
import { config, useColorMode } from 'appdeptus/designSystem'
import { type CodexName } from 'appdeptus/models'
import { SvgXml } from 'react-native-svg'
import mapCodexNameToIcon from './mapCodexNameToIcon'

type ArmyIconProps = {
  codexName: CodexName
  color?: keyof typeof config.tokens.colors
  flex?: number
  h?: number
  w?: number
}

const ArmyIcon = ({ codexName, color = 'black', ...props }: ArmyIconProps) => {
  const colorMode = useColorMode()
  return (
    <Box {...props}>
      <SvgXml
        fill={
          colorMode === 'light'
            ? config.tokens.colors[color]
            : config.themes[codexName].colors[color]
        }
        xml={mapCodexNameToIcon[codexName]}
      />
    </Box>
  )
}

export default ArmyIcon
