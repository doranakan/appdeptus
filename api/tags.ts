import { ArmiesApiTag } from 'appdeptus/modules/armies/api'
import GamesApiTag from 'appdeptus/modules/games/api/tags'

const apiTags = [...Object.values(ArmiesApiTag), ...Object.values(GamesApiTag)]

export default apiTags
