import { Box } from '@gluestack-ui/themed'
import { type CodexName } from 'appdeptus/models'
import { SvgXml } from 'react-native-svg'
import { mapCodexNameToIcon } from './mapCodexNameToIcon'

type ArmyIconProps = {
  codexName: CodexName
  flex?: number
  h?: number
  w?: number
}

const ArmyIcon = ({ codexName, ...props }: ArmyIconProps) => (
  <Box {...props}>
    <SvgXml xml={mapCodexNameToIcon[codexName]} />
  </Box>
)

export default ArmyIcon
