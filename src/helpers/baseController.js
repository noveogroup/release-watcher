import Dexie from 'dexie'
import { DATABASE_TABLE_NAME } from '@/constants'
import { dbSchema } from './dbSchema'

export default class BaseController extends Dexie {
  constructor (tableName) {
    super(DATABASE_TABLE_NAME, {
      autoOpen: true
    })
    this.version(1).stores(dbSchema)
    this.table = this.table(tableName)
  }

  getPaginated (offset, limit) {
    return this.table
      .offset(offset)
      .limit(limit)
      .toArray()
  }

  getAll () {
    return this.table.toArray()
  }

  getByPrimaryKey (repoId) {
    return this.table.get(repoId)
  }

  deleteByPrimaryKey (key) {
    this.table.delete(key)
  }

  clear () {
    this.table.clear()
  }
}
