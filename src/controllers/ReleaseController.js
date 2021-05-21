import BaseController from './BaseController'
import { RELEASES_TABLE_NAME } from '../db/constants'
import ReleasesModel from '../models/ReleasesModel'

export default class ReleaseController extends BaseController {
  constructor () {
    super(RELEASES_TABLE_NAME, new ReleasesModel())
  }

  async getReleasesByRepoID (id) {
    try {
      const { db } = this
      const tables = await db.connect()

      const res = await tables[RELEASES_TABLE_NAME].where('repoId', id).all()
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async deleteReleasesByRepoID (id) {
    try {
      const { db } = this

      const tables = await db.connect()

      const res = await tables[RELEASES_TABLE_NAME].where('repoId', id).destroy()

      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
