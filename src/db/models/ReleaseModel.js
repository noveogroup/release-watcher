import { v4 as uuid } from 'uuid'

export default class ReleaseModel {
  constructor (repoId, releaseId = uuid()) {
    this.repoId = repoId
    this.releaseId = releaseId
    this.author = ''
    this.body = ''
    this.date = ''
  }
}
