import Schema from 'validate'
import { REGEX_UUID } from '../db/constants'

const baseColumns = {
  uuid: {
    type: String,
    required: true,
    match: REGEX_UUID,
    length: 36
  },
  created_at: {
    type: Number,
    required: true
  },
  updated_at: {
    type: Number,
    required: true
  },
  deleted_at: {
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true
  }
}

export default class BaseModel extends Schema {
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
    super(mergedColumns)

    this.tableName = tableName
    this.columns = mergedColumns
    this.primary = primary
  }

  get table () {
    const {
      tableName,
      primary,
      columns
    } = this

    return Object.keys(columns).reduce((table, columnName) => {
      table.columns.push({
        name: columnName,
        attributes: {
          unique: columnName === primary
        }
      })
      return table
    }, {
      name: tableName,
      primary,
      columns: []
    })
  }

  get migration () {
    return this.table
  }
}
