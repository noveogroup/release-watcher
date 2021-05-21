import RepoController from '@/controllers/RepoController'
import ReleaseController from '@/controllers/ReleaseController'

import { v4 as uuid } from 'uuid'
// import { baseApiUrl } from '@/constants'

// repos methods
export const addRepoToDB = async (repo) => {
  try {
    const controller = new RepoController()
    return await controller.create({
      uuid: uuid(),
      ...repo
    })
  } catch (error) {
    console.error('dbMethods / addRepo', error)
  }
}

export const removeRepoFromDB = async (id) => {
  try {
    const controller = new RepoController()
    return await controller.delete(id)
  } catch (error) {
    console.error('dbMethods / removeRepo', error)
  }
}

export const getAllReposFromDB = async () => {
  try {
    const controller = new RepoController()
    return await controller.getAll()
  } catch (error) {
    console.log('dbMethods / getAllRepos', error)
  }
}

// releases methods

export const addReleaseToDB = async (release) => {
  try {
    const controller = new ReleaseController()
    return await controller.create({
      uuid: uuid(),
      ...release
    })
  } catch (error) {
    console.log('dbMethods / addRelease', error)
  }
}

export const removeReleaseFromDB = async (id) => {
  try {
    const controller = new ReleaseController()
    return await controller.deleteReleasesByRepoID(id)
  } catch (error) {
    console.log('dbMethods / removeRelease', error)
  }
}

export const getReleaseFromDB = async (repoId) => {
  try {
    const controller = new ReleaseController()
    return await controller.getReleasesByRepoID(repoId)
  } catch (error) {
    console.log('dbMethods / getReleasesByRepoId', error)
  }
}
