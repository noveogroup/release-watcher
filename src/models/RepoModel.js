import BaseModel, { UNIQUE } from './BaseModel'
import { REPOS_TABLE_NAME, PRIMARY_KEY } from '../db/constants'
export default class RepoModel extends BaseModel {
  constructor () {
    super(
      REPOS_TABLE_NAME,
      {
        id: {
          entry: UNIQUE,
          schema: {
            type: Number,
            required: true
          }
        },
        url: {
          schema: {
            type: String,
            required: true
          }
        },
        name: {
          schema: {
            type: String,
            required: true
          }
        },
        language: {
          schema: {
            type: String,
            required: true
          }
        },
        disabled: {
          schema: {
            type: Number,
            required: false
          }
        },
        newReleasesCount: {
          schema: {
            type: Number,
            required: false
          }
        }
      },
      PRIMARY_KEY
    )
  }
}
