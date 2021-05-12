import {
  REPOS_TABLE_NAME,
  RELEASES_TABLE_NAME,
  GLOBAL_SETTINGS_TABLE_NAME
} from '@/constants'

export const dbSchema = {
  [REPOS_TABLE_NAME]: 'repoId, notifications, url, name, disabled',
  [RELEASES_TABLE_NAME]: 'releaseId, repoId, body, date, title',
  [GLOBAL_SETTINGS_TABLE_NAME]: 'requestInterval'
}
