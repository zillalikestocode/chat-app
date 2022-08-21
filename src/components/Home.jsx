import React, {useEffect} from 'react'
import io from 'socket.io-client'
import Header from './Header'
import Sidebar from './Sidebar'
import {Routes, Route} from 'react-router-dom'
import RoomList from './RoomList'
import Settings from './Settings'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'
import Chat from './Chat'
import {getRooms} from '../actions/rooms'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const socket = io.connect('http://localhost:5000')

const Home = ({user, setUser}) => {
  const dispatch = useDispatch()
  const rooms = useSelector((state)=> state.rooms)

  useEffect(() => {
    const fetchRooms = async() => {
      await dispatch(getRooms({id: user?.result?._id}))
      console.log(rooms)
    }
    fetchRooms()
    }, [])

  return (
    <div className=" flex md:h-fit h-screen md:mt-20 md:w-fit md:mx-auto md:shadow-lg rounded-lg">
      <Sidebar />
      <div className="md:w-96 w-screen flex flex-col relative">
        <Header />
        <div className="h-full relative">
          <Routes>
            <Route path=":id" element={<Chat user={user}/>}/>
            <Route path="rooms" element={<RoomList rooms={rooms}/>}/>
            <Route path="settings" element={<Settings setUser={setUser} user={user}/>}/>
            <Route path="create" element={<CreateRoom rooms={rooms} user={user}/>}/>
            <Route path="join" element={<JoinRoom user={user}/>}/>
          </Routes>
        </div>
        
      </div>
    </div>
  )
}

export default Home