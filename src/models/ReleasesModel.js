import BaseModel from './BaseModel'
import { RELEASES_TABLE_NAME, PRIMARY_KEY } from '../db/constants'

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
      new: {
        type: Boolean,
        required: true
      },
      version: {
        type: String,
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
    },
    PRIMARY_KEY
    )
  }
}
