import axios from 'axios'
import { baseApiUrl } from '@/constants'

export const fetchRepo = async (url) => {
  try {
    const res = await axios.get(baseApiUrl + url)
    return res.data
  } catch (e) {
    console.log('fetchRepo / error', e)
  }
}
