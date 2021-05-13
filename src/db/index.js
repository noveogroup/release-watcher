import { Connector } from 'indexeddb-orm'

import {
  DATABASE_NAME,
  DATABASE_VERSION
} from './constants'

import RepoModel from '../models/RepoModel'

const {
  table: reposTable,
  migration: reposMigration
} = new RepoModel()

const tables = [
  reposTable
]
const migrations = [
  reposMigration
]

const settings = {
  name: DATABASE_NAME,
  version: DATABASE_VERSION,
  tables,
  migrations
}

const db = new Connector(settings)

export default db
