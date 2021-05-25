import RepoController from '@/controllers/RepoController'
import ReleaseController from '@/controllers/ReleaseController'
import SettingsController from '@/controllers/SettingsController'

import { v4 as uuid } from 'uuid'
// import { baseApiUrl } from '@/constants'

const repController = new RepoController()
const releaseController = new ReleaseController()
const settingsController = new SettingsController()

// repos methods
export const addRepoToDB = async (repo) => {
  try {
    return await repController.create({
      uuid: uuid(),
      ...repo
    })
  } catch (error) {
    console.error('dbMethods / addRepoToDB', error)
  }
}

export const removeRepoFromDB = async (id) => {
  try {
    return await repController.delete(id)
  } catch (error) {
    console.error('dbMethods / removeRepoFromDB', error)
  }
}

export const getAllReposFromDB = async () => {
  try {
    return await repController.getAll()
  } catch (error) {
    console.log('dbMethods / getAllReposFromDB', error)
  }
}

// releases methods

export const addReleaseToDB = async (release) => {
  try {
    return await releaseController.create({
      uuid: uuid(),
      ...release
    })
  } catch (error) {
    console.log('dbMethods / addReleaseToDB', error)
  }
}

export const removeReleaseFromDB = async (id) => {
  try {
    return await releaseController.deleteReleasesByRepoID(id)
  } catch (error) {
    console.log('dbMethods / removeReleaseFromDB', error)
  }
}

export const getReleaseFromDB = async (repoId) => {
  try {
    return await releaseController.getReleasesByRepoID(repoId)
  } catch (error) {
    console.log('dbMethods / getReleaseFromDB', error)
  }
}

export const updateReleaseInDB = async (payload) => {
  try {
    await releaseController.update(payload.id, payload)
  } catch (error) {
    console.log('dbMethods / updateReleaseInDB', error)
  }
}

// settings

export const getSettingsFromDB = async () => {
  try {
    return await settingsController.getOne(1)
  } catch (error) {
    console.log('dbMethods / getSettingsFromDB', error)
  }
}

export const updateSettingsInDB = async (payload) => {
  try {
    await settingsController.update(payload.index, {
      uuid: uuid(),
      ...payload
    })
  } catch (error) {
    console.log('dbMethods / updateSettingsInDB', error)
  }
}
