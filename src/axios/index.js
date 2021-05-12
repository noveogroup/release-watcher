import axios from 'axios'
const apiUrl = 'https://api.github.com'

export const fetchRepo = async (url) => {
  try {
    return await axios.get(apiUrl + url)
  } catch (e) {
    console.log('fetchRepo / error', e)
  }
}
