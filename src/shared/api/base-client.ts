import { Constants } from '@shared/lib'
import axios from 'axios'

const instance = axios.create({
  baseURL: Constants.BASE_API_URL,
})

export { instance as baseClient }
