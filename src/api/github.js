import axios from '@/axios'

const fetchWithoutBase = async url => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.log('fetchWithoutBase / error', error)
  }
}

export default {
  fetchWithoutBase
}
