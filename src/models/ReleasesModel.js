import BaseModel from './BaseModel'
import { RELEASES_TABLE_NAME } from '../db/constants'

export default class RepoModel extends BaseModel {
  constructor () {
    super(RELEASES_TABLE_NAME, {
      repoId: {
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
      version: {
        type: Boolean,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      }
    })
  }
}
