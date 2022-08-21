import React from 'react'
import {useNavigate} from 'react-router-dom'

const RoomList = ({rooms}) => {
	const navigate = useNavigate()
	
  return (
    <div className="p-2 flex flex-col gap-3">{
    	rooms.map((room, i)=>{
    		return (
    			<div key={i} onClick={()=> navigate(`/chat/${room.room}`)} className="cursor-pointer rounded-xl text-white p-2 px-4 bg-blue-400 shadow-md">
    				<h4 className="font-medium text-lg">{room.name}</h4>
    				<h4 className="text-sm">ID: {room.room}</h4>
    			</div>
    		)
    	})
    }</div>
  )
}

export default RoomList