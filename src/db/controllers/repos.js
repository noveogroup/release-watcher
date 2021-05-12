import RepoModel from '../models/RepoModel'
import BaseController from '@/helpers/BaseController'
import { REPOS_TABLE_NAME } from '@/constants'

export default class ReposController extends BaseController {
  constructor () {
    super(REPOS_TABLE_NAME)
  }

  addRepo (url, name) {
    const newRepo = new RepoModel().createRepo(url, name)
    this.table.add(newRepo, newRepo.repoId)
    return newRepo.repoId
  }
}
