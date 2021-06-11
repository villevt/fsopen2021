import axios from "axios"
const baseUrl = "/api/blogs"

let token = ""

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async blog => {
  const response = await axios.post(baseUrl, blog, {headers: {Authorization: token}})
  return response.data
}

export default {setToken, getAll, createNew}