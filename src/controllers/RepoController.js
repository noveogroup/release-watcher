import BaseController from './BaseController'
import { REPOS_TABLE_NAME } from '../db/constants'
import RepoModel from '../models/RepoModel'

export default class RepoController extends BaseController {
  constructor() {
    super(REPOS_TABLE_NAME, RepoModel)
  }
}
