import packageJSON from '../../package.json'

export const DATABASE_NAME = packageJSON?.name ?? 'release-watcher'
export const DATABASE_VERSION = 1
export const PRIMARY_KEY = 'id'
export const SETTINGS_PRIMARY_KEY = 'index'

export const REPOS_TABLE_NAME = 'repositories'
export const RELEASES_TABLE_NAME = 'releases'
export const SETTINGS_TABLE_NAME = 'settings'

export const REGEX_UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
