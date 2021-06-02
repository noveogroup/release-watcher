import BaseController from './BaseController'
import { REPOS_TABLE_NAME } from '../db/constants'
import RepoModel from '../models/RepoModel'

export default class RepoController extends BaseController {
  constructor () {
    super(REPOS_TABLE_NAME, new RepoModel())
  }

  async getActiveRepos () {
    try {
      const repos = await this.getAll({ filters: { disabled: false } })

      return Promise.resolve(repos)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async incrementNewReleasesCount (id, increment = 1) {
    try {
      const repo = await this.getOne(id)
      const repos = await this.update(id, {
        newReleasesCount: repo.newReleasesCount + increment
      })

      return Promise.resolve(repos)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
