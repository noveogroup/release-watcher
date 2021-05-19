import BaseController from './BaseController'
import { RELEASES_TABLE_NAME } from '../db/constants'
import ReleasesModel from '../models/RepoModel'

export default class RepoController extends BaseController {
  constructor () {
    super(RELEASES_TABLE_NAME, new ReleasesModel())
  }
}
