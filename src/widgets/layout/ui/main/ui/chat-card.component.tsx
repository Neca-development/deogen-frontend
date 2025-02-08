import { getChat } from '@shared/api'
import { sendMessage } from '@shared/api/chats-send'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type ChatCardProps = {
  className?: string
  variant?: 'inactive' | 'active'
}

export function ChatCardComponent({ className, variant = 'inactive' }: ChatCardProps) {
  const [inputMessage, setInputMessage] = useState('')
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false)
  const queryClient = useQueryClient()

  const { data: chatData, isLoading } = useQuery({
    queryKey: ['chat', 1],
    queryFn: () => getChat(1),
    enabled: variant === 'active',
    refetchInterval: isWaitingForResponse ? 1000 : false,
  })

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({ queryKey: ['chat', 1] })

      const previousChat = queryClient.getQueryData(['chat', 1])

      queryClient.setQueryData(['chat', 1], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          messages: [
            ...(old?.data?.messages || []),
            {
              id: Date.now(),
              content: newMessage.message,
              to: true,
            },
          ],
        },
      }))

      setIsWaitingForResponse(true)
      return { previousChat }
    },
    onError: (err, newMessage, context) => {
      queryClient.setQueryData(['chat', 1], context?.previousChat)
      setIsWaitingForResponse(false)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['chat', 1], data)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 1] })
    },
  })

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    sendMessageMutation.mutate({
      chatId: 1,
      message: inputMessage,
    })
    setInputMessage('')
  }

  if (variant === 'inactive') {
    return (
      <div
        className={`flex h-[39.75rem] w-[54.25rem] flex-col items-center justify-center rounded-[2rem] border-2 bg-[#F5F5F5] font-[600] ${className || ''}`}
      >
        <h1 className="h-[4.875rem] w-[29.6875rem] font-sans text-[2rem]">
          A chat will appear here when you hire all team members.
        </h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        className={`flex h-[39.75rem] w-[54.25rem] flex-col items-center justify-center rounded-[2rem] border-2 bg-[#F5F5F5] ${className || ''}`}
      >
        <p>Loading chat...</p>
      </div>
    )
  }

  if (!chatData?.data?.messages) {
    return (
      <div
        className={`flex h-[39.75rem] w-[54.25rem] flex-col items-center justify-center rounded-[2rem] border-2 bg-[#F5F5F5] ${className || ''}`}
      >
        <p>No messages available</p>
      </div>
    )
  }

  return (
    <div
      className={`flex h-[39.75rem] w-[54.25rem] flex-col rounded-[2rem] border-2 border-red-500 bg-[#F5F5F5] p-6 ${className || ''}`}
    >
      <div className="flex flex-1 flex-col-reverse overflow-y-auto">
        <div className="flex flex-col-reverse">
          {chatData.data.messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.to
                  ? 'ml-auto max-w-[70%] rounded-[1rem] bg-gradient-to-r from-[#F46425] to-[#F5B40B]'
                  : 'max-w-[70%] rounded-[1rem] bg-white shadow-sm'
              } p-4`}
            >
              <p className={message.to ? 'text-white' : 'text-[#121212]'}>
                {message.content}
              </p>
            </div>
          ))}
          {isWaitingForResponse && (
            <div className="mb-4 max-w-[70%] rounded-[1rem] bg-white p-4 shadow-sm">
              <p className="text-gray-500">AI is typing...</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-[1rem] border-2 border-[#E5E5E5] bg-white px-4 py-3 outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage()
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={sendMessageMutation.isPending || isWaitingForResponse}
          className="rounded-[1rem] bg-gradient-to-r from-[#F46425] to-[#F5B40B] px-6 py-3 font-medium text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}
