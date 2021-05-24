import axios from './instance'

export const fetchRepo = async (url) => {
  try {
    const res = await axios.get(url)
    console.log(res)
    return res.data
  } catch (e) {
    console.log('fetchRepo / error', e)
  }
}
