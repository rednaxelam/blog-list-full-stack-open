import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const removeToken = () => token = null

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const postBlog = async (blogObject) => {
  try {
    const response = await axios.post(baseUrl, blogObject, {headers: {Authorization: token}})
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default { setToken, removeToken, getAll, postBlog }