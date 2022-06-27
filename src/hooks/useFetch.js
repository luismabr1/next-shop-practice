import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = endPoint => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    await axios.get(endPoint).then(response => {
      setData(response.data)
    })
  }

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [endPoint])
  return data
}

export default useFetch
