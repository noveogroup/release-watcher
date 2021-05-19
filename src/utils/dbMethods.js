import RepoController from '@/controllers/RepoController'
import { v4 as uuid } from 'uuid'
// import { baseApiUrl } from '@/constants'

export const add = async (id, url, name) => {
  try {
    const controller = new RepoController()
    return await controller.create({
      uuid: uuid(),
      id,
      url,
      name
    })
  } catch (error) {
    console.error('dbMethods / add / error', error)
  }
}

export const getAll = async () => {
  try {
    const controller = new RepoController()
    return await controller.getAll()
  } catch (e) {
    console.log('dbMethods / getAll / error')
  }
}

export const remove = async (id) => {
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
