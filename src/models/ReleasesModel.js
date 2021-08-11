import BaseModel, { UNIQUE } from './BaseModel'
import { RELEASES_TABLE_NAME, PRIMARY_KEY } from '../db/constants'

export default class ReleasesModel extends BaseModel {
  constructor () {
    super(
      RELEASES_TABLE_NAME,
      {
        id: {
          entry: UNIQUE,
          schema: {
            type: Number,
            required: true
          }
        },
        repoId: {
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
            required: false
          }
        },
        new: {
          schema: {
            type: Number,
            required: true
          }
        },
        version: {
          schema: {
            type: String,
            required: true
          }
        },
        body: {
          schema: {
            type: String,
            required: false
          }
        }
      },
      PRIMARY_KEY
    )
  }
}
