import Schema from 'validate'

const baseColumns = {
  uuid: {
    type: String,
    length: 36,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: false
  },
  updated_at: {
    type: Date,
    required: false
  },
  deleted_at: {
    type: Date,
    required: false
  }
}

export default class BaseModel extends Schema {
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
          unique: columnName === tableName
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
