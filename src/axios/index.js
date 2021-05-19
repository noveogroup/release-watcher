import axios from 'axios'

// TODO: Need - export default axios.create() with default settings
const instance = axios.create()

export const fetchRepo = async (url) => {
  try {
    const res = await instance.get(url)
    console.log(res)
    return res.data
  } catch (e) {
    console.log('fetchRepo / error', e)
  }
}
