import { baseClient } from './base-client'

type CreateChatRequest = {
  agentsIds: number[]
}

type CreateChatResponse = {
  data: {
    id: number
    messages: any[]
  }
  errors: string[]
  status: number
}

export const createChat = async (data: CreateChatRequest) => {
  const response = await baseClient.post<CreateChatResponse>('/Chats/Create', data)
  return response.data
}
