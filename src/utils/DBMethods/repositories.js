import RepoController from '@/controllers/RepoController'
import { v4 as uuid } from 'uuid'

const repController = new RepoController()

/**
 * Adding a repo to indexedDB
 * @param {Object} repo - repo candidate for adding to indexedDB
 * @returns {Promise<RepoModel|Error>} - return a added repo
 */
export const addRepoToDB = async (repo) => {
  try {
    return await repController.create({
      uuid: uuid(),
      ...repo
    })
  } catch (error) {
    console.log('DBMethods / repositories / addRepoToDB', error)
  }
}

/**
 * Removing repos by id from indexedDB
 * @param {Number} id - id for finding a repo
 * @returns {Promise<Boolean|Error>} - true on success or error
 */
export const removeRepoFromDB = async (id) => {
  try {
    return await repController.delete(id)
  } catch (error) {
    console.log('DBMethods / repositories / removeRepoFromDB', error)
  }
}

/**
 * Getting list of all repos from IndexedDB
 * @returns {Promise<Array.<RepoModel>|Error>} - return array of Repos or error
 */
export const getAllReposFromDB = async () => {
  try {
    return await repController.getAll()
  } catch (error) {
    console.log('DBMethods / repositories / getAllReposFromDB', error)
  }
}
