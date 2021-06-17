import axios from "axios"

let token = ""

const api = path => { 
  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const response = await axios.get(path)
    return response.data
  }

  const create = async item => {
    const response = await axios.post(path, item, {headers: {Authorization: token}})
    return response.data
  }

  const update = async item => {
    return await axios.put(`${path}/${item.id}`, item)
  }
  
  const remove = async item => {
    return await axios.delete(`${path}/${item.id}`, {headers: {Authorization: token}})
  }

  return ({
    setToken,
    getAll,
    create,
    update,
    remove
  })
}

export default api