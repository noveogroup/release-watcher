import BaseController from './BaseController'
import { RELEASES_TABLE_NAME } from '../db/constants'
import { __ReleasesModel } from '../db'

export default class ReleaseController extends BaseController {
  constructor () {
    super(RELEASES_TABLE_NAME, __ReleasesModel.schema)
  }

  async deleteReleasesByRepoID (repoId) {
    try {
      const { db } = this
      const result = await db[RELEASES_TABLE_NAME].where({ repoId }).delete()

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
