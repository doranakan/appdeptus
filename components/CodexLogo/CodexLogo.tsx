import { Codex } from 'appdeptus/models'
import { SvgXml } from 'react-native-svg'

import { TyranidsLogo } from 'appdeptus/assets/resources'

const codexLogoMap: Record<Codex['id'], string> = {
  ['3']: TyranidsLogo
}

type CodexLogoProps = {
  codexId: Codex['id']
  height?: string | number
  width?: string | number
}

const CodexLogo = ({ codexId, ...props }: CodexLogoProps) => (
  <SvgXml
    xml={codexLogoMap[codexId]}
    {...props}
  />
)

export default CodexLogo
