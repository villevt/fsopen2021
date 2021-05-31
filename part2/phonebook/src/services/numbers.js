import axios from 'axios'

const url = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(url).then(response => response.data)
}

const create = newObject => {
    return axios.post(url, newObject).then(response => response.data)
}

const numberService = {
    getAll,
    create
}

export default numberService