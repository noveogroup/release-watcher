import RepoController from '@/controllers/RepoController'
import { v4 as uuid } from 'uuid'
import { baseApiUrl } from '@/constants'

const url = baseApiUrl + window.location.pathname + '/releases'
const name = window.location.pathname.split('/')[2]
const id = document
  .querySelector("meta[name='octolytics-dimension-repository_id']")
  ?.getAttribute('content')
  ?.toString()

export const add = async () => {
  try {
    const controller = new RepoController()
    controller.create({
      uuid: uuid(),
      id,
      url,
      name
    })
  } catch (error) {
    console.error('db erorr', error)
  }
}

export const remove = async () => {
  try {
    const controller = new RepoController()
    return await controller.delete(id)
  } catch (error) {
    console.error('db erorr', error)
  }
}

export const findId = async () => {
  try {
    const controller = new RepoController()
    const res = await controller.getOne(id)
    return !!res
  } catch (error) {
    console.error('db erorr', error)
  }
}
