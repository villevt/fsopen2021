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

const like = async blog => {
  blog = {...blog, likes: blog.likes+1}
  return await axios.put(`${baseUrl}/${blog.id}`, blog)
}

const remove = async blog => {
  return await axios.delete(`${baseUrl}/${blog.id}`, {headers: {Authorization: token}})
}

export default {setToken, getAll, createNew, like, remove}