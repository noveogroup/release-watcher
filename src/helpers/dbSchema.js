import {
  REPOS_TABLE_NAME,
  RELEASES_TABLE_NAME,
  GLOBAL_SETTINGS_TABLE_NAME
} from '@/constants'

export const dbSchema = {
  [REPOS_TABLE_NAME]: 'id, notifications, url, name, disabled',
  [RELEASES_TABLE_NAME]: 'id, repoId, body, date, title',
  [GLOBAL_SETTINGS_TABLE_NAME]: 'requestInterval'
}
