import BaseController from './BaseController'
import { REPOS_TABLE_NAME } from '../db/constants'
import RepoModel from '../models/RepoModel'

export default class RepoController extends BaseController {
  constructor () {
    super(REPOS_TABLE_NAME, RepoModel)
  }

  async deleteById (id) {
    try {
      const models = await this.db.connect()
      console.log('ID IS', id)
      const result = models[REPOS_TABLE_NAME].where('id', id).destroy()
      return Promise.resolve(result)
    } catch (error) {
      return Promise.rerject(error)
    }
  }
}
