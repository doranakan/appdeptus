import { router } from 'expo-router'

const useNavigateToHome = () => (isNewUser?: boolean) => {
  if (isNewUser) {
    router.replace(`/?showOnboarding=${isNewUser}`)
    return
  }

  router.replace('/')
}

export default useNavigateToHome
