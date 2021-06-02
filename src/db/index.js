import Dexie from 'dexie'

import {
  DATABASE_NAME,
  DATABASE_VERSION,

  REPOS_TABLE_NAME,
  RELEASES_TABLE_NAME,
  SETTINGS_TABLE_NAME
} from './constants'

import RepoModel from '../models/RepoModel'
import ReleasesModel from '../models/ReleasesModel'
import SettingsModel from '../models/SettingsModel'

export const __RepoModel = new RepoModel()
export const __ReleasesModel = new ReleasesModel()
export const __SettingsModel = new SettingsModel()

const stores = {
  [REPOS_TABLE_NAME]: __RepoModel.table,
  [RELEASES_TABLE_NAME]: __ReleasesModel.table,
  [SETTINGS_TABLE_NAME]: __SettingsModel.table
}

const db = new Dexie(DATABASE_NAME)
db.version(DATABASE_VERSION).stores(stores)

export default db
