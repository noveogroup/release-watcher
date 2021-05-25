import { v4 as uuidv4 } from 'uuid'
import { isObject } from '@/utils/typeChecker'
import db from '../db'

/** BaseController */
export default class BaseController {
  /**
   * @param {String} tableName - The table name
   * @param {Object} model - The model object
   * @param {Boolean} softDelete - The soft delete, default false, if true then cannot delete a row from the table.
   */
  constructor (tableName, model, softDelete = false) {
    if (!tableName || !model) {
      throw new Error('BaseController - tableName and model is required')
    }

    this.tableName = tableName
    this.model = model
    this.softDelete = softDelete
    this.db = db
  }

  /**
   * Retrieving one record from the database using the primary key
   * @param {String} primaryKeyValue - The primary key value
   * @returns {Promise<Model|Error>} - Get one record in the database by primaryKeyValue or error
   */
  async getOne (primaryKeyValue) {
    try {
      const { db, tableName } = this
      const tables = await db.connect()
      const result = await tables[tableName].find(primaryKeyValue)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Retrieving all records of a database table with pagination
   * @param {Number} page - The current page, default 1.
   * @param {Number} perPage - The per page, default 25.
   * @returns {Promise<Model[]|Error>} - Get all record in the database or error
   */
  async getAll (page = 1, perPage = 25) {
    try {
      const { db, tableName } = this
      const tables = await db.connect()

      const total = await tables[tableName].count()

      const end = page * perPage
      const start = end - perPage

      const result = await tables[tableName]
        .between('index', start > 0 ? start : 1, end > total ? total : end)
        .all()

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
      const { db, model, tableName } = this
      const tables = await db.connect()

      const total = await tables[tableName].count()

      const baseFields = {
        uuid: uuidv4(),
        index: total + 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
        deleted: false
      }

      const data = {
        ...baseFields,
        ...(isObject(payload) ? payload : {})
      }

      const errors = model.validate(data)
      if (errors.length) throw new Error(errors)

      const result = await tables[tableName].create(payload)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Updating a record in a database table
   * @param {String} primaryKeyValue - The primary key value
   * @param {Object} payload - The payload to update to the database
   * @returns {Promise<Model|Error>} - Updated record in the database or error
   */
  async update (primaryKeyValue, payload = {}) {
    try {
      const { db, model, tableName, create } = this
      const tables = await db.connect()

      const currentFields = await tables[tableName].find(primaryKeyValue)

      if (!isObject(currentFields)) {
        const result = await create(payload)
        return Promise.resolve(result)
      }

      const data = {
        ...currentFields,
        ...(isObject(payload) ? payload : {}),
        updated_at: new Date()
      }

      console.log('data', data)

      const errors = model.validate(data)

      console.log('errors', errors)
      if (errors.length) throw new Error(errors)

      const result = await tables[tableName].save(primaryKeyValue, data, true)
      console.log('result', result)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Deleting a record in a database table
   * @param {String} primaryKeyValue - The primary key value
   * @returns {Promise<Model|Error>} - Deleted record in the database or error
   */
  async delete (primaryKeyValue) {
    try {
      const { db, tableName, update, softDelete } = this
      const tables = await db.connect()

      if (softDelete) {
        const currentFields = tables[tableName].find(primaryKeyValue)
        const result = await update(primaryKeyValue, {
          ...(isObject(currentFields) ? currentFields : {}),
          deleted_at: new Date(),
          deleted: true
        })
        return Promise.resolve(result)
      }

      const result = await tables[tableName].delete(primaryKeyValue)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
