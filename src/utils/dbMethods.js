import RepoController from '@/controllers/RepoController'
import { v4 as uuid } from 'uuid'
// import { baseApiUrl } from '@/constants'

export const addRepo = async (repo) => {
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

export const getAllRepos = async () => {
  try {
    const controller = new RepoController()
    return await controller.getAll()
  } catch (error) {
    console.log('dbMethods / getAllRepos', error)
  }
}

export const removeRepo = async (id) => {
  try {
    const controller = new RepoController()
    return await controller.delete(id)
  } catch (error) {
    console.error('db remove error', error)
  }
}

export const findId = async (id) => {
  try {
    const controller = new RepoController()
    const res = await controller.getOne(id)
    return !!res
  } catch (error) {
    console.error('db erorr', error)
  }
}
