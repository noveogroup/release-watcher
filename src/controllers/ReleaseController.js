import BaseController from './BaseController'
import { RELEASES_TABLE_NAME } from '../db/constants'
import ReleasesModel from '../models/ReleasesModel'

export default class ReleaseController extends BaseController {
  constructor () {
    super(RELEASES_TABLE_NAME, new ReleasesModel())
  }
}
