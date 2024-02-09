import { supabase } from 'appdeptus/utils'

const getUserId = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw { error }
  }

  return data.user.id
}

export { getUserId }
