import { supabase } from 'appdeptus/utils'

const getUserId = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return { error: JSON.stringify(error) }
    }

    return data.user.id
  } catch (error) {
    return { error: JSON.stringify(error) }
  }
}

export { getUserId }
