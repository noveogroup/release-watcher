import BaseModel from './BaseModel'
import { REPOS_TABLE_NAME, PRIMARY_KEY } from '../db/constants'

export default class RepoModel extends BaseModel {
  constructor () {
    super(
      REPOS_TABLE_NAME,
      {
        id: {
          type: Number,
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
        // most popular coding language of repo
        language: {
          type: String,
          required: true
        },
        disabled: {
          type: Boolean,
          required: false
        },
        newReleasesCount: {
          type: Number,
          required: false
        }
      },
      PRIMARY_KEY
    )
  }
}
