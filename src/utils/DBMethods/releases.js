import ReleaseController from '@/controllers/ReleaseController'

import { v4 as uuid } from 'uuid'

const releaseController = new ReleaseController()

/**
 * Adding a release to indexedDB
 * @param {ReleasesModel} release - a release what should be added
 * @returns {Promise<ReleasesModel|Error>} - returning added release on success or error
 */
export const addReleaseToDB = async (release) => {
  try {
    return await releaseController.create({
      uuid: uuid(),
      ...release
    })
  } catch (error) {
    console.log('DBMethods / releases / addReleaseToDB', error)
  }
}

/**
 * Removing release from indexedDB by id
 * @param {Number} id - a id of release to delete
 * @returns {Boolean|Error} - returning boolean, success deleting or not, or error
 */
export const removeReleaseFromDB = async (id) => {
  try {
    return await releaseController.deleteReleasesByRepoID(id)
  } catch (error) {
    console.log('dbMethods / removeReleaseFromDB', error)
  }
}

/**
 * Getting releases from DB by repo ID
 * @param {Number} repoId - id of repo, getting releases by this id
 * @returns {Promise<Array.<ReleasesModel>|Error>} - returning array of releases or error
 */
export const getReleaseFromDB = async (repoId) => {
  try {
    return await releaseController.getReleasesByRepoID(repoId)
  } catch (error) {
    console.log('dbMethods / getReleaseFromDB', error)
  }
}

/**
 *  Update release info: new or not
 * @param {ReleasesModel} payload - release with updated info
 * @returns {Promise<Boolean|Error>} - return success update or not, or error
 */
export const updateReleaseInDB = async (payload) => {
  try {
    return await releaseController.update(payload.id, payload)
  } catch (error) {
    console.log('dbMethods / updateReleaseInDB', error)
  }
}
