import axios from "axios"

const url = "/api/persons"

const getAll = () => {
  return axios.get(url).then(response => response.data)
}

const create = newObject => {
  return axios.post(url, newObject).then(response => response.data)
}

const remove = id => {
  return axios.delete(`${url}/${id}`).then(response => response.data)
}

const update = updatedObject => {
  return axios.put(`${url}/${updatedObject.id}`, updatedObject).then(response => response.data)
}

const numberService = {
  getAll,
  create,
  remove,
  update
}

export default numberService