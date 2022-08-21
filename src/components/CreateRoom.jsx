import React, { useState } from 'react'
import Button from './Button'
import io from 'socket.io-client'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
const socket = io.connect('http://localhost:5000')
import {createRoom, getRooms } from '../actions/rooms'

const CreateRoom = ({user}) => {
  const dispatch = useDispatch()
  const [room, setRoom] = useState('')
  const [roomDey, setRoomDey] = useState(false)
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const newRoom = await dispatch(createRoom({name, room, id: user.result._id}))
    if (newRoom){
      await socket.emit('join_room', room)
      await dispatch(getRooms({id: user?.result?._id}))
      navigate(`/chat/${room}`)
    }else{
      setRoomDey(true)
    }
  }

  return (
    <div className="mt-7">
      <form  className="flex flex-col gap-3 items-center" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 w-56 items-center">
          <h4 className="font-medium text-lg">Create a room</h4>
          <input onChange={(e)=> setName(e.target.value)} type="text" placeholder="Room Name" className="rounded-md focus:outline-none bg-slate-400 placeholder-white p-2 shadow" />
          <input onChange={(e)=> setRoom(e.target.value)} type="text" placeholder="Room ID" className="rounded-md focus:outline-none bg-slate-400 placeholder-white p-2 shadow" />
        {roomDey && <p className="text-sm text-red-500 ">Room with ID already exists</p>}
        </div>
        <Button type='submit' text="Create Room" className="p-2 rounded-md bg-blue-600 shadow-md text-white font-medium" />
      </form>
    </div>
  )
}

export default CreateRoom