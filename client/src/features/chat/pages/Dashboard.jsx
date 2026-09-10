import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { useEffect } from 'react'
const Dashboard = () => {
    
  const chat = useChat()

     const {user} = useSelector(state => state.auth)
      console.log(user)

      useEffect(()=>{
        chat.initializedSocketConnection()
      },[])

  return (
    <div>
     Dashboard
    </div>
  )
}

export default Dashboard
