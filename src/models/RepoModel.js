import BaseModel from './BaseModel'
import { REPOS_TABLE_NAME, PRIMARY_KEY } from '../db/constants'

export default class RepoModel extends BaseModel {
  constructor () {
    super(REPOS_TABLE_NAME, {
      id: {
        type: String,
        required: true
      },
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
    }, PRIMARY_KEY)
  }
}
