import { baseClient } from './base-client'

type Agent = {
  id: number
  name: string
  type: string
}

type GetAgentsResponse = {
  data: Agent[]
  errors: string[]
  status: number
}

export const getAgents = async () => {
  const response = await baseClient.get<GetAgentsResponse>('/Agents/All')
  return response.data
}
