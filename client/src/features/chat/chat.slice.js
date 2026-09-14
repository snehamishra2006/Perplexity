

import {createSlice} from "@reduxjs/toolkit"
const chatSlice = createSlice({
    name:'chat',
    initialState:{
     chats:{},
     currentChatId:null,
     isLoading:false,
     error:null,
    },
    reducers:{

        createNewChat:(state,action)=>{
            const {chatId, title} = action.payload
            state.chats[chatId]={
                id:chatId,
                title,
                messages:[],
                lastUpdate: new Date().toISOString()
            }
            state.currentChatId = chatId
        },

          addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload
            state.chats[ chatId ].messages.push({ content, role })
        },
        addMessages: (state, action) => {
            const { chatId, messages } = action.payload
            state.chats[ chatId ].messages.push(...messages)
        },  
         
        setChats:(state,action)=>{
          state.chats = action.payload  
        },
        setCurrentChatId: (state,action)=>{
            state.currentChatId = action.payload
        },
        setLoading: (state,action)=>{
            state.isLoading = action.payload
        },
        setError: (state,action)=>{
            state.error= action.payload
        },
    }
})

export const {setChats, setCurrentChatId,setLoading, setError,createNewChat,addMessages, addNewMessage} = chatSlice.actions

export default chatSlice.reducer
// chats = {
//     "docker and AWS":{
//         messages:[
//             {
//             role:"user",
//             content:"What is Docker ?"
//         },
//         {
//             role: "ai",
//             content:" Docker is a platform that allows developer to easily create, and deploy run applications"
//         }
//         ],
//         id:"docker and AWS",
//         lastUpdated:"2024-06-20T12:34:56Z",   
// }
// }
