import { type CodexName } from 'appdeptus/models'
import { usePostHog } from 'posthog-react-native'

const useFeatureFlag = <T extends FeatureFlagKey>(key: T) => {
  const postHog = usePostHog()

  return (postHog.getFeatureFlagPayload(key) as FeatureFlags | null)?.[key]
}

type FeatureFlagKey = 'disabled-armies' | 'discord-invite-link'

type FeatureFlags = {
  'disabled-armies': CodexName[]
  'discord-invite-link': string
}

export default useFeatureFlag
