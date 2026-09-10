// connect frontend and backend with the help of socket connection

import { initializedSocketConnection } from "../service/chat.socket";

export const useChat = ()=>{

    return{
        initializedSocketConnection
    }
}
