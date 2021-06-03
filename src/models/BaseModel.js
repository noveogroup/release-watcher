import Schema from 'validate'
import { REGEX_UUID } from '../db/constants'

export const AIPK = '++'
export const UNIQUE = '&'
export const MULTI = '*'

const baseColumns = {
  uuid: {
    entry: UNIQUE,
    schema: {
      type: String,
      required: true,
      match: REGEX_UUID,
      length: 36
    }
  },
  created_at: {
    schema: {
      type: Number,
      required: true
    }
  },
  updated_at: {
    schema: {
      type: Number,
      required: true
    }
  },
  deleted_at: {
    schema: {
      type: Number,
      required: true
    }
  },
  deleted: {
    schema: {
      type: Number,
      required: true
    }
  }
}

export default class BaseModel {
  /**
   * @param {String} tableName - The table name
   * @param {Object} newColumns - The new columns for table
   * @param {String} primary - The primary key
   */
  constructor (tableName, newColumns = {}, primary = 'uuid') {
    if (typeof tableName !== 'string') throw new Error('BaseModel - tableName is required')

    const mergedColumns = {
      ...baseColumns,
      ...newColumns
    }

    this.tableName = tableName
    this.columns = mergedColumns
    this.primary = primary
  }

  get __Schema () {
    return new Schema(
      Object.entries(this.columns).reduce((schema, [columnName, { schema: columnSchema }]) => {
        schema[columnName] = columnSchema

        return schema
      }, {})
    )
  }

  get table () {
    return Object.entries(this.columns)
      .filter(([columnName]) => columnName !== this.primary)
      .reduce((table, [columnName, { entry = '' }]) => {
        table += `${entry}${columnName},`
        return table
      }, `${this.columns[this.primary].entry ?? ''}${this.primary},`)
      .slice(0, -1)
  }
}
