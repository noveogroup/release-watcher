import BaseModel from './BaseModel'
import { REPOS_TABLE_NAME } from '../db/constants'

export default class RepoModel extends BaseModel {
  constructor () {
    super(REPOS_TABLE_NAME, {
      url: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        required: false
      }
    })
  }
}
