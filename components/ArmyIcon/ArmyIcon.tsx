import { Box } from '@gluestack-ui/themed'
import { config } from 'appdeptus/designSystem'
import { type CodexName } from 'appdeptus/models'
import { SvgXml } from 'react-native-svg'
import mapCodexNameToIcon from './mapCodexNameToIcon'

type ArmyIconProps = {
  codexName: CodexName
  color?: string
  flex?: number
  h?: number
  w?: number
}

const ArmyIcon = ({ codexName, color = 'black', ...props }: ArmyIconProps) => (
  <Box {...props}>
    <SvgXml
      fill={config.tokens.colors[color]}
      xml={mapCodexNameToIcon[codexName]}
    />
  </Box>
)

export default ArmyIcon
