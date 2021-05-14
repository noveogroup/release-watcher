import RepoController from '@/controllers/RepoController'
import { v4 as uuid } from 'uuid'
import { baseApiUrl } from '@/constants'

const url = baseApiUrl + window.location.pathname + '/releases'
const name = window.location.pathname.split('/')[2]
const uuidValue = uuid()

export const add = async () => {
  const controller = new RepoController()
  controller.create({
    uuid: uuidValue,
    id: document
      .querySelector("meta[name='octolytics-dimension-repository_id']")
      ?.getAttribute('content')
      ?.toString(),
    url,
    name
  })
}

export const remove = async () => {
  const controller = new RepoController()
  const res = await controller.deleteById(
    document
      .querySelector("meta[name='octolytics-dimension-repository_id']")
      ?.getAttribute('content')
      ?.toString()
  )
  console.log('result is ', res)
}
