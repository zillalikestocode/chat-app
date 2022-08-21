import React, { useState } from 'react'
import Button from './Button'
import io from 'socket.io-client'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {joinRoom, getRooms} from '../actions/rooms'

const socket = io.connect('http://localhost:5000')
const JoinRoom = ({user}) => {
  const navigate = useNavigate()
  const [room, setRoom] = useState('')
  const dispatch = useDispatch()
  const [noRoom, setNoRoom] = useState(false)
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const newRoom = await dispatch(joinRoom({room, id: user?.result?._id}))
      if (newRoom){
        await dispatch(getRooms({id: user?.result?._id}))
        await socket.emit('join_room', room)
        setNoRoom(false)
        navigate(`/chat/${room}`)
      }else{
        setNoRoom(true)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <div className="mt-7">
      <form action="" className="flex flex-col gap-3 items-center" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 w-56 items-center">
          <h4 className="font-medium text-lg">Join a room</h4>
          <input required onChange={(e)=> setRoom(e.target.value)} type="text" placeholder="Room ID" className="rounded-md focus:outline-none bg-slate-400 placeholder-white p-2 shadow" />
          {noRoom && <p className="text-sm text-red-500">Room does not exist</p>}
        </div>
        <Button type='submit' text="Join Room" className="p-2 rounded-md bg-blue-600 shadow-md text-white font-medium" />
      </form>
    </div>
  )
}

export default JoinRoom