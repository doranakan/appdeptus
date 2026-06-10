enum Table {
  ARMIES = 'armies',
  ARMY_ENTRIES = 'army_entries',
  CODEXES = 'codexes',
  COMMUNITIES = 'communities',
  COMMUNITIES_REQUESTS = 'communities_requests',
  COMMUNITIES_USERS = 'communities_users',
  DETACHMENTS = 'detachments',
  ENHANCEMENTS = 'detachment_enhancements',
  GAME_ARMIES = 'game_armies',
  GAMES = 'games',
  TIERS = 'unit_tiers',
  UNITS = 'units',
  TOURNAMENT_MATCHES = 'tournament_matches',
  TOURNAMENT_REGISTRATIONS = 'tournament_registrations',
  TOURNAMENT_ROUNDS = 'tournament_rounds',
  TOURNAMENTS = 'tournaments',
  USERS = 'users',
  USER_NOTIFICATIONS = 'user_notifications',
  USERS_PUSH_TOKENS = 'users_push_tokens'
}

enum Bucket {
  COMMUNITY_IMAGES = 'community_images',
  PROFILE_IMAGES = 'profile_images'
}

export { Bucket, Table }
