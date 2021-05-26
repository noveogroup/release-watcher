import RepoController from '@/controllers/RepoController'
import { v4 as uuid } from 'uuid'

const repController = new RepoController()

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
