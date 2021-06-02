import BaseModel from './BaseModel'
import { RELEASES_TABLE_NAME, PRIMARY_KEY } from '../db/constants'

export default class ReleasesModel extends BaseModel {
  constructor () {
    super(
      RELEASES_TABLE_NAME,
      {
        id: {
          type: Number,
          required: true
        },
        repoId: {
          type: Number,
          required: true
        },
        url: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: false
        },
        new: {
          type: Boolean,
          required: true
        },
        version: {
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
