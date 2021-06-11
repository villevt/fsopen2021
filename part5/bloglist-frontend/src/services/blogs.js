import axios from "axios"
const baseUrl = "/api/blogs"

let token = ""

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = blog => {
  const request = axios.post(baseUrl, blog, {headers: {Authorization: token}})
  return request.then(response => response.data)
}

export default {setToken, getAll, createNew}