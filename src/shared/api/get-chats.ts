import { baseClient } from './base-client'

type GetChatResponse = {
  data: {
    id: number
    messages: any[]
  }
  errors: string[]
  status: number
}

export const getChat = async (id: number) => {
  const response = await baseClient.get<GetChatResponse>(`/Chats/${id}`)
  return response.data
}
