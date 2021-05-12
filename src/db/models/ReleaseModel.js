import { v4 as uuid } from 'uuid'

export default class ReleaseModel {
  constructor (newRelease) {
    this.repoId = newRelease.repoId || ''
    this.id = uuid()
    this.author = newRelease.author || ''
    this.body = newRelease.body || ''
    this.date = newRelease.date || ''
  }
}
