import ReleaseModel from '../models/ReleaseModel'
import BaseController from '@/helpers/BaseController'
import { RELEASES_TABLE_NAME, REPOS_TABLE_NAME } from '@/constants'

export default class ReposController extends BaseController {
  constructor () {
    super(RELEASES_TABLE_NAME)
  }

  async addRelease (release) {
    const newRelease = new ReleaseModel(release)
    const repo = await this.table(REPOS_TABLE_NAME).get(newRelease.repoId)
    newRelease.repoId = repo.repoId
    return newRelease.id
  }
}
