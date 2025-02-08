import { baseClient } from './base-client'

type SendMessageRequest = {
  chatId: number
  message: string
}

type SendMessageResponse = {
  data: {
    id: number
    messages: any[]
  }
  errors: string[]
  status: number
}

export const sendMessage = async (data: SendMessageRequest) => {
  const response = await baseClient.post<SendMessageResponse>('/Chats/send', data)
  return response.data
}
