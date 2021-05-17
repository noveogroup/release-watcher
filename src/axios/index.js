import axios from 'axios'

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
