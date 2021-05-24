import { Connector } from 'indexeddb-orm'

import {
  DATABASE_NAME,
  DATABASE_VERSION
} from './constants'

import RepoModel from '../models/RepoModel'
import ReleasesModel from '../models/ReleasesModel'
import SettingsModel from '../models/SettingsModel'

const {
  table: reposTable,
  migration: reposMigration
} = new RepoModel()
const {
  table: releasesTable,
  migration: releasesMigration
} = new ReleasesModel()
const {
  table: settingsTable,
  migration: settingsMigration
} = new SettingsModel()

const tables = [
  reposTable,
  releasesTable,
  settingsTable
]
const migrations = [
  reposMigration,
  releasesMigration,
  settingsMigration
]

const settings = {
  name: DATABASE_NAME,
  version: DATABASE_VERSION,
  tables,
  migrations
}

const db = new Connector(settings)

export default db
