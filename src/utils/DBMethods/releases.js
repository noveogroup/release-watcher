import ReleaseController from '@/controllers/ReleaseController'
import { v4 as uuid } from 'uuid'

const releaseController = new ReleaseController()

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
