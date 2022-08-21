import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Button from './Button'
import {TbSend} from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {sendMessage, getMessages} from '../actions/messages'

const socket = io.connect('https://https://z-chat-project.herokuapp.com/')

const Chat = ({user}) => {
  const messages = useSelector(state => state.messages)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()
  const [currentRoom, setRoom] = useState({})
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  socket.emit('join_room', id)

  const send = async(e)=>{
    e.preventDefault()
    if(currentMessage !== 0){
      const messageData = {
        room: id,
        username: user?.result?.username,
        author: user?.result?.name,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      }

      await socket.emit('send_message', messageData)
      setMessageList((list)=> [...list, messageData])
       await dispatch(sendMessage(messageData))
      
      setCurrentMessage('')
    }
  }
  useEffect(()=>{
    socket.on('receive_message', (data)=>{
      setMessageList((list)=> [...list, data])  
    })
  }, [socket])
  useEffect(() => {
    async function get(){
      const room = await dispatch(getMessages(id))
      setRoom(room)
      console.log(currentRoom)
    }
    get()
  }, [])
  useEffect(() => {
    setMessageList(messages)
    }, [messages, dispatch])


  return (
    <div className="h-full w-full flex flex-col relative">
      <div className="fixed  left-10 right-0 ">
        <div className="max-w-[150px] mt-2 overflow-x-hidden w-fit p-2 shadow-md whitespace-nowrap m-auto text-center text-white rounded-2xl bg-violet-400 opacity-[0.6]">
          <h4 className="">{currentRoom.name}</h4>
        </div>
      </div>
        <div className=" flex flex-col px-3 gap-3 md:h-[250px] h-[calc(100vh-114px)] overflow-y-scroll">
        {messageList.map((msg, i) => (
          <div key={i} className={`flex flex-col ${user?.result?.username === msg.username ? 'ml-auto':'mr-auto'}`}>
            <h4 className={`${user?.result?.username === msg.username ? 'ml-auto': 'mr-auto'} text-xs font-medium`}>{msg.author.split(' ')[0]}</h4>
            <div className={`rounded-2xl max-w-[250px] text-white w-fit shadow-md gap-1 px-3 p-2 ${user?.result?.username === msg.username ? 'bg-green-300 rounded-tr-sm ' : 'bg-blue-300 rounded-tl-sm'}`}>
              <h4 >{msg.message}</h4>
            </div>
            <h4 className={`${user?.result?.username === msg.username ? 'ml-auto pr-2': 'mr-auto pl-2'} mt-1 text-xs `}>{msg.time}</h4>
          </div>
          
        ))}
        </div>
        <form onSubmit={send} className=' flex gap-2 items-start p-3 justify-between'>
            <input row="1" onChange={(e)=> setCurrentMessage(e.target.value)} name="" className='focus:outline-none w-full bg-slate-300 text-slate-900 rounded-md shadow p-2' placeholder="Write a Message"/>
            <div className="w-fit">
                <Button type="submit" text={<TbSend fontSize={25}/>} className='ml-auto text-white bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center' />
            </div>
        </form>
    </div>
  )
}

export default Chat