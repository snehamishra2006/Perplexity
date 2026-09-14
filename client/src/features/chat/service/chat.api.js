// for interactingg with api
//api layer

import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true,
})

// sending message
export const sendMessage = async({message,chatId})=>{
    const response = await api.post("/api/chats/message",
         {message,chat:chatId})
    return response.data
}

//getting chat
export const getChats = async()=>{
    const response = await api.get("/api/chats")
    return response.data
}

// getting chats messages
export const getMessages = async (chatId)=>{
    const response = await api.get(`/api/chats/${chatId}/messages`)
    return response.data
}

// delete chat

export const deleteChat = async (chatId)=>{
    const response = await api.delete(`/api/chats/delete/${chatId}`)
    return response.data
}