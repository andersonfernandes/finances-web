import axios from 'axios'

const buildHeaders = () => {
  let headers = {
    'Content-Type': 'application/json'
  }

  return headers
}

const Client = axios.create({
  baseURL: 'https://financesapi.herokuapp.com/v1',
  headers: buildHeaders(),
})

export default Client
