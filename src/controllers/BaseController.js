import { v4 as uuidv4 } from 'uuid'
import { isObject } from '@/utils/typeChecker'
import __db from '../db'

/** BaseController */
export default class BaseController {
  /**
   * @param {String} tableName - The table name
   * @param {Object} __Schema - The Schema instance
   * @param {Boolean} softDelete - The soft delete, default false, if true then cannot delete a row from the table.
   */
  constructor (tableName, __Schema, softDelete = false) {
    if (!tableName || !__Schema) {
      throw new Error('BaseController - tableName and schema is required')
    }

    this.tableName = tableName
    this.__Schema = __Schema
    this.softDelete = softDelete
    this.__db = __db
  }

  /**
   * Retrieving one record from the database using the primary key
   * @param {String} primaryKeyValue - The primary key value
   * @returns {Promise<Model|Error>} - Get one record in the database by primaryKeyValue or error
   */
  async getOne (primaryKeyValue) {
    try {
      const { __db, tableName } = this
      const result = await __db[tableName].get(primaryKeyValue)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Getting the total number of records in a table
   * @param {Object} filters = Filters for request
   * @returns {Promise<Number|Error>} - the total number of records in a table
   */
  async getCount (filters = {}) {
    try {
      const { __db, tableName } = this
      const count = await __db[tableName]
        .where({ ...filters, deleted: 0 })
        .count()

      return Promise.resolve(count)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Retrieving all records of a database table with pagination
   * @param {Number} page - The current page, default 1.
   * @param {Number} perPage - The per page, default 5.
   * @param {Object} filters = Filters for request
   * @returns {Promise<Model[]|Error>} - Get all record in the database or error
   */
  async getAll ({
    page = 1,
    perPage: limit = 5,
    filters = {}
  } = {}) {
    try {
      const { __db, tableName } = this

      const offset = (page * limit) - limit
      const result = await __db[tableName]
        .where({ ...filters, deleted: 0 })
        .reverse()
        .offset(offset)
        .limit(limit)
        .toArray()

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Creating a record in a database table
   * @param {Object} payload - The payload to create to the database
   * @returns {Promise<Model|Error>} - Created record in the database or error
   */
  async create (payload = {}) {
    try {
      const { __db, tableName, __Schema } = this

      const data = {
        ...(isObject(payload) ? payload : {}),
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
        deleted_at: new Date().getTime(),
        deleted: 0
      }

      const errors = __Schema.validate(data)
      if (errors.length) throw new Error(errors)

      await __db[tableName].add(data)

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Updating a record in a database table
   * @param {Number} primaryKeyValue - The primary key value
   * @param {Object} payload - The payload to update to the database
   * @returns {Promise<Model|Error>} - Updated record in the database or error
   */
  async update (primaryKeyValue, payload = {}) {
    try {
      const { __db, tableName, __Schema } = this

      const currentFields = await this.getOne(primaryKeyValue)

      if (!isObject(currentFields)) {
        const result = await this.create(payload)
        return Promise.resolve(result)
      }

      const data = {
        ...currentFields,
        ...(isObject(payload) ? payload : {}),
        updated_at: new Date().getTime()
      }

      const errors = __Schema.validate(data)
      if (errors.length) throw new Error(errors)

      await __db[tableName].put(data, primaryKeyValue)

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Deleting a record in a database table
   * @param {Number} primaryKeyValue - The primary key value
   * @returns {Promise<Model|Error>} - Deleted record in the database or error
   */
  async delete (primaryKeyValue) {
    try {
      const { __db, tableName, softDelete } = this

      const currentFields = await this.getOne(primaryKeyValue)
      const deletableFields = (isObject(currentFields) ? currentFields : {})

      if (softDelete) {
        const result = await this.update(primaryKeyValue, {
          ...deletableFields,
          deleted_at: new Date().getTime(),
          deleted: 1
        })
        return Promise.resolve(result)
      }

      await __db[tableName].delete(primaryKeyValue)

      return Promise.resolve(deletableFields)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
