import axios from 'axios'
import { baseAiUrl } from '@/constants'

export const fetchRepo = async (url) => {
  try {
    const res = await axios.get(baseAiUrl + url)
    return res.data
  } catch (e) {
    console.log('fetchRepo / error', e)
  }
}
