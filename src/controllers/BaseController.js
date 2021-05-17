import db from '../db'

export default class BaseController {
  constructor (tableName, Model) {
    if (!tableName || !Model) {
      throw new Error('BaseController - tableName and Model is required')
    }

    this.tableName = tableName
    this.Model = Model
    this.db = db
  }

  async getOne (value) {
    try {
      const tables = await this.db.connect()
      const result = tables[this.tableName].find(value)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getAll () {
    try {
      const tables = await this.db.connect()
      const result = tables[this.tableName].all()

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async create (payload) {
    try {
      const { Model } = this
      const errors = new Model().validate(payload)
      if (errors.length) throw new Error(errors)

      const tables = await this.db.connect()
      const result = tables[this.tableName].create(payload)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async update (uuid, payload) {
    try {
      const { Model } = this
      const errors = new Model().validate(payload)
      if (errors.length) throw new Error(errors)

      const tables = await this.db.connect()
      const result = tables[this.tableName].save(uuid, payload)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async delete (value) {
    try {
      const tables = await this.db.connect()
      const result = tables[this.tableName].delete(value)

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
