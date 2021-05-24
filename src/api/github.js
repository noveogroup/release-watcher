import axios from '@/axios'

const fetchWithoutBase = async url => {
  try {
    console.log(url)
    const res = await axios.get(url)
    return res.data
  } catch (e) {
    console.log('GitHub fetch error', e)
  }
}

export default {
  fetchWithoutBase
}
