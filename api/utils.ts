import { supabase } from 'appdeptus/utils'

const getUserId = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return { error }
    }

    return data.user.id
  } catch (error) {
    return { error }
  }
}

export { getUserId }
