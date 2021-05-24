import BaseController from './BaseController'
import { REPOS_TABLE_NAME } from '../db/constants'
import RepoModel from '../models/RepoModel'

export default class RepoController extends BaseController {
  constructor () {
    super(REPOS_TABLE_NAME, new RepoModel())
  }

  async getActiveRepos () {
    try {
      const tables = await this.db.connect()
      const res = await tables[REPOS_TABLE_NAME].where('disabled', false).all()

      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
