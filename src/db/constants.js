import packageJSON from '../../package.json'

export const DATABASE_NAME = packageJSON?.name ?? 'release-watcher'
export const DATABASE_VERSION = 1

export const REPOS_TABLE_NAME = 'repos'
