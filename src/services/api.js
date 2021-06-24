import axios from 'axios'

const Api = axios.create({
  baseURL: 'https://financesapi.herokuapp.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default Api
