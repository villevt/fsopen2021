import { useEffect, useState } from "react"
import axios from "axios"


export const useResource = path => {  
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    const response = await axios.get(path)
    setResources(response.data)
  }

  const create = async newObject => {
    const response = await axios.post(path, newObject)
    setResources(
      resources.concat(response.data)
    )
  }

  const service = {
    getAll,
    create,
  }

  return [
    resources,
    service
  ]
}